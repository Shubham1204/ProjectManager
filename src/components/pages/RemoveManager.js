import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';


const RemoveManager = (props) => {

  const history = useHistory();

  let { id } = useParams();


  const [email, setEmail] = useState('');
  const [taskstatusval, setTaskstatusval] = useState('');

  const onStatusChange = (event) => setTaskstatusval(event.target.value);



  useEffect(() => {



    let projectRef = db.collection('project_manager_mapping').doc(id)
    projectRef.get().then(doc => {
      let { email } = doc.data()
      setEmail(email);
    })

  }, [])



  const onRemoveManager = () => {
    console.log('inside task status', taskstatusval);

    db.collection('project_manager_mapping').doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
      history.goBack();
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }


  return (
    <div>

      <h1>current manager:</h1>
      <h4>manager name: {email}</h4>


      <button onClick={onRemoveManager}>Remove manager</button>

    </div>
  );
}

export default RemoveManager;