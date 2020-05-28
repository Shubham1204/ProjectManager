import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';


const RemoveLink = (props) => {

  const history = useHistory();

  let { id } = useParams();


  const [link, setLink] = useState('');
  const [linkname, setLinkname] = useState('');
  const [taskstatusval, setTaskstatusval] = useState('');

  const [taskname, setTaskname] = useState('');
  const [taskstatus, setTaskStatus] = useState('');

  const onStatusChange = (event) => setTaskstatusval(event.target.value);


  useEffect(() => {



    let projectRef = db.collection('project_link_mapping').doc(id)
    projectRef.get().then(doc => {
      let { link, linkname } = doc.data();
      setLink(link);
      setLinkname(linkname);
    })

  }, [])


  const onRemoveLink = () => {
    console.log('inside task status', taskstatusval);

    db.collection('project_link_mapping').doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
      history.goBack();
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }


  return (
    <div>

      <h1>current link:</h1>
      <h4>link name: {linkname}</h4>
      <h4>link: {link}</h4>


      <button onClick={onRemoveLink}>Remove link</button>

    </div>
  );
}

export default RemoveLink;