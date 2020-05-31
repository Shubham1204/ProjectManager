import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';


const TaskStatus = (props) => {

  let { id } = useParams();

  const history = useHistory();
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


  const onUpdateTaskStatus = () => {

    db.collection('project_task_mapping').doc(id)
      .get()
      .then(function (querySnapshot) {
        db.collection("project_task_mapping").doc(id).update({
          taskstatus: taskstatusval
        });
      })
    history.goBack();
  }


  return (
    <div>

      <h1>current task:</h1>
      <h4>Task name: {taskname}</h4>
      <h4>status: {taskstatus}</h4>


      <select onChange={onStatusChange}>
        <option value="-1">Select</option>
        <option value="pending">Pending</option>
        <option value="in progress">in progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={onUpdateTaskStatus}>Update Status</button>

    </div>
  );
}

export default TaskStatus;