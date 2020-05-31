import React, { useState, useEffect, Fragment } from 'react';
import db from '../../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';


const ReallocateManager = (props) => {

  const history = useHistory();

  let { id } = useParams();


  // const [statusval, setStatusval] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  // const [assigned, setAssigned] = useState('');

  // const onStatusChange = (event) => setTaskstatusval(event.target.value);



// console.log('id',id);
  useEffect(() => {



    let projectRef = db.collection('user_mst').doc(id)
    projectRef.get().then(doc => {
      let { username,email,contact } = doc.data()
      setUsername(username);
      setEmail(email);
      setContact(contact);
    })

  }, [])


  const onReallocateManager = () => {
  //   console.log('inside task status', taskstatusval);

  let postRef = db.collection('user_mst').doc(id)

  postRef.update({
    assigned: "no"
  })
    .then(function () {
      console.log("Document successfully updated!");
      history.goBack();
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }


  return (
    <div>

      <h1>current User:</h1>
      <h4>User name: {username}</h4>
      <h4>Email: {email}</h4>
      <h4>Conatct: {contact}</h4>

      <button onClick={onReallocateManager}>Reallocate Manager</button>

    </div>
  );
}

export default ReallocateManager;