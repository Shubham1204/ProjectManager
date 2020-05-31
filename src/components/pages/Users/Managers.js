import React, { useState, useEffect, Fragment } from "react";
import ProjectSnippet from "../../projects/ProjectSnippet";
import db from "../../../firebase";
import {Link } from 'react-router-dom';
// import './App.css';

const Managers = (props) => {
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    db.collection('user_mst').where("role","==","manager")
    // .where("assigned","==","no")
    .onSnapshot(async users =>{
        let usersData = await users.docs.map(user =>{
            let data = user.data()
            let {id} = user
            let payload ={
                id,
                ...data
            }
            // console.log(data)
            return payload
        });
        setUsers(usersData)
    })

    },[])

  // console.log('page load',projects)
  return (
    <div>
       <table className="table">
                <thead className="thead-dark table-striped">
                  <tr>
                    <th>S No.</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td> # </td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.contact}</td>
                      <td>
                      {user.assigned=="deallocated"?
                          <Fragment>
                          No Operations Avaliable since user is disabled !!
                          <button className="btn btn-info my-2 mx-2"><Link to={`../reallocatemanager/${user.id}`} className="text-white text-capitalize">Reallocate manager</Link></button>
                          </Fragment>
                        :
                        <Fragment>
                        <button className="btn btn-info my-2 mx-2"><Link to={`../upgrademanager/${user.id}`} className="text-white text-capitalize">Upgrade Manager</Link></button>
                        <button className="btn btn-danger my-2 mx-2"><Link to={`../deallocatemanager/${user.id}`} className="text-white text-capitalize">Remove/Deallocate Manager from Organisation</Link></button>
                        </Fragment>
                      }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
      {/* {users.map((user) => (
        // <h1>{project.id} {project.projectname}</h1>
        <div className="my-4" key={user.id}>
          <ProjectSnippet
            key={user.id}
            pid={user.id}
            pname={user.email}
            pdate={user.contact}
          />
        </div>
      ))} */}
    </div>
  );
};

export default Managers;