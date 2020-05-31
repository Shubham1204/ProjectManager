import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase';
import { useParams, useHistory } from 'react-router-dom';


const AddLinks = (props) => {

  let { id } = useParams();
  const history = useHistory();
  const [projectname, setProjectname] = useState('');
  const [status, setStatus] = useState('');
  const [createdate, setCreatedate] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState([]);
  const [linkval, setLinkval] = useState('');
  const [linknameval, setLinknameval] = useState('');

  const onLinknameChange = (event) => setLinknameval(event.target.value);
  const onLinkChange = (event) => setLinkval(event.target.value);


  useEffect(() => {



    let projectRef = db.collection('project_mst').doc(id)
    projectRef.get().then(doc => {
      let { projectname, status, createdate, description } = doc.data()
      setProjectname(projectname);
      setStatus(status);
      setCreatedate(createdate);
      setDescription(description);


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
  })



  const onAddLinks = () => {
    var projectid = id;
    var linkname = linknameval;
    var link = linkval;
    let postRef = db.collection('project_link_mapping');
    let payload = { projectid, linkname, link }
    postRef.add(payload)
      .then(function (file) {
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
          <p><span className="font-weight-bold">Links : </span>
            <ol className="ml-5">
              {links.map(link => (
                <Fragment key={link.link}>
                  <li > {link.linkname} </li>
                  <h6>Link: {link.link}</h6>
                </Fragment>
              ))}
            </ol>
          </p>

          <span>
            <span className="font-weight-bold mr-5">Add Link  </span>
            <input type="text" className="mx-2" value={linknameval} onChange={onLinknameChange} placeholder="link name" />
            <input type="text" value={linkval} onChange={onLinkChange} placeholder="web address" />
            <button className="mx-2 btn btn-primary" onClick={onAddLinks}>Add Link</button>
          </span>
        </div>
      </div>


    </div>
  );
}

export default AddLinks;