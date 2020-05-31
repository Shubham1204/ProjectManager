import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';


const RemoveMember = (props) => {

  let { id } = useParams();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [taskstatusval, setTaskstatusval] = useState('');

  const onStatusChange = (event) => setTaskstatusval(event.target.value);



  useEffect(() => {



    let projectRef = db.collection('project_member_mapping').doc(id)
    projectRef.get().then(doc => {
      let { email } = doc.data()
      setEmail(email);
    })

  }, [])

  const onRemove = () => {
    db.collection("project_member_mapping").doc(id).delete().then(function () {
      updateassign()
      history.goBack();
    }).catch(function (error) {
    });
  }

  const updateassign = () => {

    db.collection("user_mst").where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          db.collection('user_mst').doc(doc.id).update({
            assigned: "no"
          })
            .then(function () {
            })
            .catch(function (error) {
            });
        });
      })
      .catch(function (error) {
      });

  }

  return (
    <div>

      <h1>current member email:</h1>

      <h4>email: {email}</h4>


      <button onClick={onRemove}>Remove him from project</button>


    </div>
  );
}

export default RemoveMember;