import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';

const Approveproject = (props) => {

  let { id } = useParams();

  const history = useHistory();

  const [projectname, setProjectname] = useState('');
  const [projectstatus, setProjectstatus] = useState('');
  const [description, setDescription] = useState('');
  const [projectstatusval, setProjectstatusval] = useState('');

  const onStatusChange = (event) => setProjectstatusval(event.target.value);



  useEffect(() => {



    let projectRef = db.collection('project_mst').doc(id)
    projectRef.get().then(doc => {
      let { projectname, status, description } = doc.data()
      setProjectname(projectname);
      setProjectstatus(status);
      setDescription(description);
    })

  }, [])

  const onUpdateProjectStatus = () => {

    db.collection('project_mst').doc(id)
      .get()
      .then(function (querySnapshot) {
        db.collection("project_mst").doc(id).update({
          approved: projectstatusval,
          status: projectstatusval === "yes" ? "completed" : "in progress"
        });
        if (projectstatusval === "yes") {
          updatememberstatus()
        }
      })
    history.push("/projects");
  }


  const updatememberstatus = () => {
    console.log("updATE MEMBER status", id);

    db.collection('project_member_mapping').where("projectid", "==", `${id}`)
      .onSnapshot(async members => {
        let membersData = await members.docs.map(member => {
          let data = member.data()
          let { id } = member
          let payload = {
            id,
            ...data
          }
          console.log(id, data.email)

          db.collection("user_mst").where("email", "==", data.email)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                console.log(doc.id, " => ", doc.data());
                db.collection('user_mst').doc(doc.id).update({
                  assigned: "no"
                })
                  .then(function () {
                    console.log("Document successfully updated!");
                  })
                  .catch(function (error) {
                    console.error("Error updating document: ", error);
                  });
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        });
      })
  }

  return (
    <div>

      <h1>Project:</h1>
      <h4>Project name: {projectname}</h4>
      <h4>description: {description}</h4>
      <h4>status: {projectstatus}</h4>


      <select onChange={onStatusChange}>
        <option value="-1">Select</option>
        <option value="no">Don't Approve</option>
        <option value="yes">Yes Approve</option>
      </select>
      <button onClick={onUpdateProjectStatus}>Update Project Status</button>

    </div>
  );
}

export default Approveproject;