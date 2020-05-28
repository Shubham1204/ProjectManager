import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';

const AssignManager = (props) => {

  let { id } = useParams();

  const history = useHistory();

  const [role, setRole] = useState('');
  const [assigned, setAssigned] = useState('');
  const [managerval, setManager] = useState('');
  const [projectname, setProjectname] = useState('');
  const [status, setStatus] = useState('');
  const [createdate, setCreatedate] = useState('');
  const [description, setDescription] = useState('');
  const [managers, setManagers] = useState([]);
  const [assignedmanagers, setAssignedManagers] = useState('');

  const onManagerChange = (event) => setManager(event.target.value);



  useEffect(() => {

    db.collection('user_mst').where("assigned", "==", "no").where("role", "==", "manager")
      .onSnapshot(async managers => {
        let managersData = await managers.docs.map(manager => {
          let data = manager.data()
          let { id } = manager
          let payload = {
            id,
            ...data
          }
          return payload
        });
        setManagers(managersData)
      })

    let projectRef = db.collection('project_mst').doc(id)
    projectRef.get().then(doc => {
      let { projectname, status, createdate, description } = doc.data()
      setProjectname(projectname);
      setStatus(status);
      setCreatedate(createdate);
      setDescription(description);
    })

    db.collection('project_manager_mapping').where("projectid", "==", `${id}`)
      .onSnapshot(async managers => {
        let managersData = await managers.docs.map(manager => {
          let data = manager.data()
          let { id } = manager
          let payload = {
            id,
            ...data
          }
          return payload
        });
        setAssignedManagers(managersData)
      })
  }, [])



  const onAssignManager = () => {
    console.log('inside assign', managerval);
    var projectid = id;
    var email = managerval;
    let postRef = db.collection('project_manager_mapping');
    let payload = { projectid, email }
    postRef.add(payload)
      .then(function (file) {
        console.log("doc", file)
        history.goBack();
      })
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
          <p><span className="font-weight-bold">Managers : </span>
            <ol className="ml-5">
              {assignedmanagers.length ?
                assignedmanagers.map(manager => (
                  <React.Fragment key={manager.id}>
                    <li> {manager.email}
                      <Link className="ml-4" to={`/removemanager/${manager.id}`}>Remove</Link>
                    </li>
                  </React.Fragment>
                ))
                : "no managers assigned yet !"}
            </ol>
          </p>
          <p><span className="font-weight-bold">Assign Managers : </span>

            <select
              value={managerval}
              onChange={onManagerChange}>
              <option value='-1'>Select</option>
              {managers.map(manager => (
                <option key={manager.email} value={manager.email} >Name: {manager.username} , Email: {manager.email}</option >
              ))}
            </select>
            <button onClick={onAssignManager}>Add manager</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AssignManager;