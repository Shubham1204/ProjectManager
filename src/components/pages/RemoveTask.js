import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';


const RemoveTask = (props) => {

  const history = useHistory();

  let { id } = useParams();


  const [taskstatusval, setTaskstatusval] = useState('');

  const [taskname, setTaskname] = useState('');
  const [taskstatus, setTaskStatus] = useState('');

  const onStatusChange = (event) => setTaskstatusval(event.target.value);




  useEffect(() => {



    let projectRef = db.collection('project_task_mapping').doc(id)
    projectRef.get().then(doc => {
      let { task, taskstatus } = doc.data()
      setTaskname(task);
      setTaskStatus(taskstatus);
    })

  }, [])


  const onRemoveTask = () => {
    db.collection('project_task_mapping').doc(id).delete().then(function () {
      history.goBack();
    }).catch(function (error) {
    });
  }


  return (
    <div>

      <h1>current task:</h1>
      <h4>Task name: {taskname}</h4>
      <h4>status: {taskstatus}</h4>


      <button onClick={onRemoveTask}>Remove Task</button>

    </div>
  );
}

export default RemoveTask;