import React, { useState, useEffect, Fragment } from 'react';
import db from '../../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';


const UpgradeDowngradeManager = (props) => {

  let { id } = useParams();

  const history = useHistory();
  const [managerstatusval, setManagerstatusval] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  // const [taskname, setTaskname] = useState('');
  // const [taskstatus, setTaskStatus] = useState('');

  const onStatusChange = (event) => setManagerstatusval(event.target.value);




  useEffect(() => {



    let projectRef = db.collection('user_mst').doc(id)
    projectRef.get().then(doc => {
      let { username,email,contact } = doc.data()
      setUsername(username);
      setEmail(email);
      setContact(contact);
    })

  }, [])


  const onChangeManager = () => {
    console.log('inside task status', managerstatusval);

    db.collection('user_mst').doc(id)
    .get()
    .then(function (querySnapshot) {
      db.collection("user_mst").doc(id).update({
        role: managerstatusval
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
        <option value="member">Downgrade To Member</option>
        <option value="admin">Upgrade To Admin</option>
      </select>
      <button onClick={onChangeManager}>Upgrade/Downgrade</button>

    </div>
  );
}

export default UpgradeDowngradeManager;