import React, { useState, useEffect, Fragment } from "react";
import ProjectSnippet from "../../projects/ProjectSnippet";
import db from "../../../firebase";
import {Link } from 'react-router-dom';
// import './App.css';

const Members = (props) => {
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    db.collection('user_mst').where("role","==","member")
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
                    <th scope="col">Assigned / Not Assigned</th>
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
                      <td>{user.assigned}</td>
                      <td>
                        {user.assigned=="deallocated"?
                          <Fragment>
                          No Operations Avaliable since user is disabled !!
                          <button className="btn btn-info my-2 mx-2"><Link to={`../reallocatemember/${user.id}`} className="text-white text-capitalize">Reallocate member</Link></button>
                          </Fragment>
                          :
                        <Fragment>
                          <button className="btn btn-info my-2 mx-2"><Link to={`../upgrademember/${user.id}`} className="text-white text-capitalize">Upgrade member</Link></button>
                          <button className="btn btn-danger my-2 mx-2"><Link to={`../deallocatemember/${user.id}`} className="text-white text-capitalize">Remove/Deallocate Member from Organisation</Link></button>
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

export default Members;