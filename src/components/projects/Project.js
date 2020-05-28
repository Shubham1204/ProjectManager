import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase'
import { useParams, Link } from 'react-router-dom';

const Project = (props) => {
  let { id } = useParams();

  const [projectname, setProjectname] = useState('');
  const [status, setStatus] = useState('');
  const [createdate, setCreatedate] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [links, setLinks] = useState([]);
  const [approved, setApproved] = useState('');
  useEffect(() => {
    let projectRef = db.collection('project_mst').doc(id)
    projectRef.get().then(doc => {
      let { projectname, status, createdate, description, approved } = doc.data()
      setProjectname(projectname);
      setStatus(status);
      setCreatedate(createdate);
      setDescription(description);
      setApproved(approved);
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
        setMembers(membersData)
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
        setManagers(managersData)
      })

    db.collection('project_task_mapping').where("projectid", "==", `${id}`)
      .onSnapshot(async tasks => {
        let tasksData = await tasks.docs.map(task => {
          let data = task.data()
          let { id } = task
          let payload = {
            id,
            ...data
          }
          return payload
        });
        setTasks(tasksData)
      })

    db.collection('project_tag_mapping').where("projectid", "==", `${id}`)
      .onSnapshot(async tags => {
        let tagsData = await tags.docs.map(tag => {
          let data = tag.data()
          let { id } = tag
          let payload = {
            id,
            ...data
          }
          return payload
        });
        setTags(tagsData)
      })

    db.collection('project_link_mapping').where("projectid", "==", `${id}`)
      .onSnapshot(async links => {
        let linksData = await links.docs.map(link => {
          let data = link.data()
          let { id } = link
          let payload = {
            id,
            ...data
          }
          return payload
        });
        setLinks(linksData)
      })
  }, [])



  return (

    <div>
      <div className="card">
        <div className="card-body">
          <span className="float-left"><span className="font-weight-bold">Project name : </span> {projectname}</span>
          <span className="float-left text-success font-weight-bold mx-5">Status: {status}</span>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <p><span className="font-weight-bold">Project name :</span>{projectname}</p>
          <p><span className="font-weight-bold">Date Created :</span> {createdate}</p>
          <p><span className="font-weight-bold">Description :</span> {description}</p>
          <p><span className="font-weight-bold">Is project Approved : </span>
            {approved == "no" ? " Not yet ! " : " Yes the project is approved !! "}
          </p>
          <span><span className="font-weight-bold">Tags : </span>
            {tags.length ?
              tags.map(tag => (
                <Fragment>
                  <span className="btn btn-outline-secondary mx-2" key={tag.tag}> {tag.tag}</span>

                  <Link className="ml-1" to={`/updatetag/${tag.id}`}>Update</Link>
                  <Link className="ml-2 text-danger" to={`/removetag/${tag.id}`}>Remove</Link>
                </Fragment>
              ))
              : " no tags !"}
          </span>
          <br></br>
          <span><span className="font-weight-bold">Links : </span>
            {links.length ?
              <ol className="ml-5">
                {links.map(link => (
                  <Fragment key={link.link}>
                    <span className="left">
                      <li>
                        <span className="font-weight-bold">{link.linkname}</span>
                        <span className="right">
                          <Link className="ml-4" to={`/updatelink/${link.id}`}>Update</Link>
                          <Link className="ml-4 text-danger" to={`/removelink/${link.id}`}>Remove</Link>
                        </span>
                        <br></br>
              Link: {link.link}
                      </li>
                    </span>
                    <br></br>
                  </Fragment>
                  // content={post.content}
                ))}
              </ol>
              : "no links !"}
          </span>
          <br></br>
          <p><span className="font-weight-bold my-2">Tasks : </span>
            {tasks.length ?
              <table className="table">
                <thead className="thead-dark table-striped">
                  <tr>
                    <th scope="col">Task Name</th>
                    <th scope="col">Task Status</th>
                    <th scope="col">Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id}>
                      <td>{task.task}</td>
                      <td>{task.taskstatus}</td>
                      <td>
                        <button className="btn btn-info my-2 mx-2"><Link to={`../taskstatus/${task.id}`} className="text-white text-capitalize">update tasks stauts</Link></button>
                        <button className="btn btn-danger my-2 mx-2"><Link to={`../removetask/${task.id}`} className="text-white text-capitalize">Remove task</Link></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> : "Seems no Task is there !!"}
          </p>


          <span><span className="font-weight-bold">Managers : </span>
            {managers.length ?
              managers.map(manager => (
                <Fragment>
                  <span className="ml-2" key={manager.email}> {manager.email}</span>
                  <Link className="ml-4" to={`/removemanager/${manager.id}`}>Remove</Link>
                </Fragment>
              ))

              :
              <Fragment>
                <span className="mx-2">no manager asssigned yet !<button className="btn btn-primary mx-2"><Link className="text-white text-capitalize" to={`../assignmanager/${id}`}>assign manager</Link></button></span>
              </Fragment>
            }
          </span>
          <br></br>
          <span><span className="font-weight-bold">Members : </span>
            {members.length ?
              <ol className="ml-5">
                {members.map(member => (
                  <Fragment key={member.id}>
                    <li> {member.email}
                      <Link className="ml-4" to={`/removemember/${member.id}`}>Remove</Link>
                    </li>
                  </Fragment>
                ))}
              </ol>
              : "no members assigned yet !"}

          </span>
          <br></br>

          <button className="btn btn-primary mx-2"><Link className="text-white text-capitalize" to={`../assignmember/${id}`}>assign member</Link></button>
          <button className="btn btn-warning mx-2"><Link className="text-white text-capitalize" to={`../addtags/${id}`}>add tags</Link></button>
          <button className="btn btn-info mx-2"><Link className="text-white text-capitalize" to={`../addtasks/${id}`}>add tasks</Link></button>

          <button className="btn btn-success mx-2"><Link className="text-white text-capitalize" to={`../addlinks/${id}`}>add link</Link></button>
          <button className="btn btn-danger mx-2"><Link className="text-white text-capitalize" to={`../editproject/${id}`}>EDIT project</Link></button>
          <button className="btn btn-primary mx-2"><Link className="text-white text-capitalize" to={`../approveproject/${id}`}>Approve/Dis Approve Project</Link></button>

        </div>
      </div>
    </div>
  );
}

export default Project;