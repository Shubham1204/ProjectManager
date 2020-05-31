import React, { useState, useEffect, Fragment } from 'react';
import db from '../../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';


const DowngradeAdmin = (props) => {

  let { id } = useParams();

  const history = useHistory();
  const [memberstatusval, setMemberstatusval] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  // const [taskname, setTaskname] = useState('');
  // const [taskstatus, setTaskStatus] = useState('');

  const onStatusChange = (event) => setMemberstatusval(event.target.value);




  useEffect(() => {



    let projectRef = db.collection('user_mst').doc(id)
    projectRef.get().then(doc => {
      let { username,email,contact } = doc.data()
      setUsername(username);
      setEmail(email);
      setContact(contact);
    })

  }, [])


  const onDowngradeMember = () => {
    console.log('inside task status', memberstatusval);

    db.collection('user_mst').doc(id)
    .get()
    .then(function (querySnapshot) {
      db.collection("user_mst").doc(id).update({
        role: memberstatusval
      });
    })
    history.goBack();
  }


  return (
    <div>

<h1>current User:</h1>
      <h4>User name: {username}</h4>
      <h4>Email: {email}</h4>
      <h4>Conatct: {contact}</h4>


      <select onChange={onStatusChange}>
        <option value="-1">Select</option>
        <option value="member">Member</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={onDowngradeMember}>Update Status</button>

    </div>
  );
}

export default DowngradeAdmin;