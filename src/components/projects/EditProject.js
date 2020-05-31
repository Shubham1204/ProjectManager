import React, { useState, useEffect } from 'react';
import db from '../../firebase'
import { useParams, Link, useHistory } from 'react-router-dom';

const EditProject = (props) => {
  let { id } = useParams();

  const history = useHistory();
  const [projectname, setProjectname] = useState('');
  const [projectnameval, setProjectnameval] = useState('');
  const [status, setStatus] = useState('');
  const [createdate, setCreatedate] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionval, setDescriptionval] = useState('');
  const [members, setMembers] = useState('');


  const onProjectnameChange = (event) => setProjectnameval(event.target.value);
  const onDescriptionChange = (event) => setDescriptionval(event.target.value);


  const onEditProject = () => {
    let postRef = db.collection('project_mst').doc(id)

    postRef.update({
      projectname: projectnameval,
      description: descriptionval
    })
      .then(function () {
        history.goBack();
      })
      .catch(function (error) {
      });

  }

  useEffect(() => {
    let projectRef = db.collection('project_mst').doc(id)
    projectRef.get().then(doc => {
      let { projectname, status, createdate, description, approved } = doc.data()
      setProjectname(projectname);
      setStatus(status);
      setMembers(members);
      setCreatedate(createdate);
      setDescription(description);

    })
  })
  return (

    <div>
      Proejct Name: {projectname} <br></br>
      description: {description}
      <br></br>
      create date: {createdate}
      <br></br>
      <h5>Project Name</h5>
      <input type="text" value={projectnameval} onChange={onProjectnameChange} />
      <h5>description</h5>
      <input type="text" value={descriptionval} onChange={onDescriptionChange} />

      <button onClick={onEditProject}>Edit Project</button>
    </div>
  );
}

export default EditProject;