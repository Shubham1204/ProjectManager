import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';


const AssignMember = (props) => {

  let { id } = useParams();

  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');
  const [assigned, setAssigned] = useState('');
  const [memberval, setMember] = useState('');
  const [projectname, setProjectname] = useState('');
  const [status, setStatus] = useState('');
  const [createdate, setCreatedate] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [assignedmembers, setAssignedMembers] = useState([]);

  const onMemberChange = (event) => setMember(event.target.value);
  const onUsernameChange = (event) => setUsername(event.target.value);
  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);
  const onContactChange = (event) => {
    setContact(event.target.value);
    setRole('member');
    setAssigned('no');
  }


  useEffect(() => {

    db.collection('user_mst').where("assigned", "==", "no").where("role", "==", "member")
      .onSnapshot(async members => {
        let membersData = await members.docs.map(member => {
          let data = member.data()
          let { id } = member
          let payload = {
            id,
            ...data
          }
          return payload
        });
        setMembers(membersData)
      })

    let projectRef = db.collection('project_mst').doc(id)
    projectRef.get().then(doc => {
      let { projectname, status, createdate, description, tags, tasks, links, approved, assignedmanager } = doc.data()
      setProjectname(projectname);
      setStatus(status);
      setCreatedate(createdate);
      setDescription(description);
    })
    db.collection('project_member_mapping').where("projectid", "==", `${id}`)
      .onSnapshot(async members => {
        let membersData = await members.docs.map(member => {
          let data = member.data()
          let { id } = member
          let payload = {
            id,
            ...data
          }
          return payload
        });
        setAssignedMembers(membersData)
      })
  }, [])



  const onAssignMember = () => {
    var projectid = id;
    var email = memberval;
    let postRef = db.collection('project_member_mapping');
    let payload = { projectid, email }
    postRef.add(payload)
      .then(function (file) {
        updateassignedstatus();
      })
  }
  const updateassignedstatus = () => {
    db.collection('user_mst').where("email", "==", `${memberval}`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          db.collection("user_mst").doc(doc.id).update({
            assigned: "yes"
          });
        });
      })

    db.collection('project_mst').doc(id)
      .get()
      .then(function (querySnapshot) {
        db.collection("project_mst").doc(id).update({
          status: "in progress"
        });
      })

    history.goBack();
  }

  return (
    <div>
      <div class="card">
        <div class="card-body">
          <span className="float-left"><span className="font-weight-bold">Project name : </span> {projectname}</span>
          <span className="float-left text-success font-weight-bold mx-5">Status: {status}</span>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <p><span className="font-weight-bold">Project name :</span>{projectname}</p>
          <p><span className="font-weight-bold">Date Created :</span> {createdate}</p>
          <p><span className="font-weight-bold">Description :</span> {description}</p>
          <span><span className="font-weight-bold">Members : </span>
            <ol className="ml-5">
              {assignedmembers.length ?
                assignedmembers.map(member => (
                  <React.Fragment key={member.id}>
                    <li> {member.email}
                      <Link className="ml-4" to={`/removemember/${member.id}`}>Remove</Link>
                    </li>
                  </React.Fragment>
                  // content={post.content}
                ))
                : "no members assigned yet !"}
            </ol>
          </span>
          <br></br>
          <p><span className="font-weight-bold">Assign Members : </span>
            <select className="form-group"
              value={memberval}
              onChange={onMemberChange}>
              <option value='-1'>Select</option>
              {members.map(member => (
                <option key={member.email} value={member.email} >Name: {member.username} , Email: {member.email}</option >
              ))}
            </select>
            <button className="btn btn-primary mx-2" onClick={onAssignMember}>Add member</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AssignMember;