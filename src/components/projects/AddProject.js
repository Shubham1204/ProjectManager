import React, {useState} from 'react';
import db from '../../firebase';
import {useHistory} from 'react-router-dom';

const AddProject = (props) => {

    const history = useHistory();
    const [projectname,setProjectname] = useState('');
    const [status,setStatus] = useState('');
    const [createdate,setCreatedate] = useState('');
    const [description,setDescription] = useState('');
    const [approved,setApproved] = useState('');


    const onProjectnameChange = (event) => setProjectname(event.target.value);
    const onDescriptionChange = (event) =>{ setDescription(event.target.value);
        setStatus('pending');
        setCreatedate(new Date().toLocaleString());
        setApproved('no');
    }
    
    const onAddProject = () => {
        
        let postRef = db.collection('project_mst');
        let payload = {projectname,status,createdate,description,approved}
        postRef.add(payload)
        .then(function(file){
            history.push("/projects");
        })
    }

  return (
    <div>
        <h3>Add Project</h3>
        <h5>Project Name</h5>
        <input type="text" value={projectname} onChange={onProjectnameChange} />
        
        <h5>description</h5>
        <input type="text" value={description} onChange={onDescriptionChange} />
        <button onClick={onAddProject}>Add Manager</button>
    </div>
  );
}

export default AddProject;