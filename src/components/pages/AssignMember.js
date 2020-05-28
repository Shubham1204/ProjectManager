import React, {useState,useEffect} from 'react';
import db from '../../firebase';
import {useParams,Link,useHistory} from 'react-router-dom';
// import Posts from '';
// import './App.css';


const AssignMember = (props) => {

    let { id } = useParams();

    const history = useHistory();
    // console.log('create',props.user.uid)
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [contact,setContact] = useState('');
    const [role,setRole] = useState('');
    const [assigned,setAssigned] = useState('');
    const [memberval,setMember] = useState('');
    const [projectname,setProjectname] = useState('');
    const [status,setStatus] = useState('');
    const [createdate,setCreatedate] = useState('');
      const [description,setDescription] = useState('');
      const [tags,setTags] = useState('');
      const [tasks,setTasks] = useState('');
      const [members,setMembers] = useState([]);
      const [assignedmembers,setAssignedMembers] = useState([]);
      const [links,setLinks] = useState('');
      const [approved,setApproved] = useState('');
      const [assignedmanager,setAssignedmanager] = useState('');

    const onMemberChange = (event) => setMember(event.target.value);
    const onUsernameChange = (event) => setUsername(event.target.value);
    const onEmailChange = (event) => setEmail(event.target.value);
    const onPasswordChange = (event) => setPassword(event.target.value);
    const onContactChange = (event) =>{ setContact(event.target.value);
        // setUserid(props.user.uid);
        setRole('member');
        setAssigned('no');
        console.log(role)
        // console.log('insid ecreate post ',userid);
    }
    

    useEffect(()=> {

        db.collection('user_mst').where("assigned","==","no").where("role","==","member")
        .onSnapshot(async members =>{
            let membersData = await members.docs.map(member =>{
                let data = member.data()
                let {id} = member
                let payload ={
                    id,
                    ...data
                }
                return payload
            });
            setMembers(membersData)
        })

        let projectRef = db.collection('project_mst').doc(id)
        // console.log(id);
        projectRef.get().then(doc =>{
        //  console.log(doc.data());
          let {projectname,status,createdate,description,tags,tasks,links,approved,assignedmanager} = doc.data()
            setProjectname(projectname);
            setStatus(status);
            // setMembers(members);
            setCreatedate(createdate);
            setDescription(description);
            // setTags(tags);
            // setTasks(tasks);
            // setLinks(links);
            // setApproved(approved);
            // setAssignedmanager(assignedmanager);
            // console.log(projectname,status,createdate,description,members,tags,tasks,links,approved,assignedmanager)
        })   
        db.collection('project_member_mapping').where("projectid","==",`${id}`)
        .onSnapshot(async members =>{
            let membersData = await members.docs.map(member =>{
                let data = member.data()
                let {id} = member
                let payload ={
                    id,
                    ...data
                }
                return payload
            });
            setAssignedMembers(membersData)
        }) 
    },[])



    // let postRef = db.collection('user_mst').where("assigned","==","no").where("role","==","manager").get().then(snap => {
    //     snap.forEach(doc => {
    //         // console.log('shubham    ',doc.data());
    //         // console.log('shubham name   ',doc.data().name);
    //         // setName(doc.data().name);
    //         // setSkill(doc.data().skill);
    //         console.log(doc.data().username);
    //     })
    // })
                                        const onAssignMember = () => {
                                            console.log('inside assign',memberval);
        // console.log(content);
        var projectid= id;
        var email = memberval;
        let postRef = db.collection('project_member_mapping');
        let payload = {projectid,email}
        // console.log(payload)
        // console.log(role);
        postRef.add(payload)
        .then(function(file){
            updateassignedstatus();
            console.log("doc",file)
        })
        // setTitle('')
        // setContent('')
        // setUserid('')
        // navigate('/')
    }
    const updateassignedstatus = () =>{
        db.collection('user_mst').where("email","==",`${memberval}`)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //   console.log(doc.id, " => ", doc.data());
          // Build doc ref from doc.id
          db.collection("user_mst").doc(doc.id).update({
            //   name: name,
            //   skill: skill,
            assigned:"yes"
            //   userid:userid
            //    skill: {skill}
            });
      });
 })

 db.collection('project_mst').doc(id)
  .get()
  .then(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
        //   console.log(doc.id, " => ", doc.data());
          // Build doc ref from doc.id
          db.collection("project_mst").doc(id).update({
            //   name: name,
            status:"in progress"
            //   skill: skill,
            // assigned:"yes"
            //   userid:userid
            //    skill: {skill}
            });
    //   });
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
            {assignedmembers.length?
    assignedmembers.map(member =>  (
      <React.Fragment key={member.id}>
              <li> {member.email}        
              <Link className="ml-4" to={`/removemember/${member.id}`}>Remove</Link>
              </li>
            </React.Fragment>
            // content={post.content}
            ))
            :"no members assigned yet !"}
            </ol>
            </span>
            <br></br>
            <p><span className="font-weight-bold">Assign Members : </span>
        <select className="form-group"
        value={memberval}
        onChange={onMemberChange}>
            <option value='-1'>Select</option>
        {members.map(member =>  (
          // <ProjectSnippet key={project.id} pid={project.id} pname={project.projectname}  /> 
          <option key={member.email} value={member.email} >Name: {member.username} , Email: {member.email}</option >
          // content={post.content}
          ))}
              {/* <option value="pending">Pending</option> 
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
          <option value="mango">Mango</option> */}
            </select>
        <button className="btn btn-primary mx-2" onClick={onAssignMember}>Add member</button> 
        </p>
          </div>
          </div>
    </div>
  );
}

export default AssignMember;