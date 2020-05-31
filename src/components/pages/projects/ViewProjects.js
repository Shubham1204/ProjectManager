import React, { useState, useEffect } from "react";
import ProjectSnippet from "./ProjectSnippet";
import db from "../../firebase";


const ViewProjects = (props) => {
  //way1
 // const [mydata, setMydata] = useState({data:[]});
 //way2
    const [mydata, setMydata] = useState([]);
  
  const [tempu, setTempu] = useState([]);
  let temp = [];

  var tablename;
  props.role==="member"
  ?
    tablename ="project_member_mapping"
  :
    tablename ="project_manager_mapping"
  
  useEffect(() => {
    const projectRef = async () =>

    
    
    console.log('role ',props.role)

      db
        .collection(tablename)
        .where("email", "==", `${props.useremail}`)
        .onSnapshot(async (members) => {
          let membersData = members.docs.map((member) => {
            let data = member.data();
            // console.log(data);
            let { id } = member;
            let payload = {
              id,
              ...data,
            };

            console.log('before ',payload)
            const projectRef = db.collection("project_mst").doc(payload.projectid);
            projectRef.get().then((doc) => {
              let data = doc.data();
              let { id } = doc;
              let mypayload = {
                id,
                ...data,
              };
              temp.push(mypayload);
              
              //two ways to correct either use array itself or object
              //way1
              setMydata([...temp]);
              //way2
              //setMydata({data:temp});
              /*
              change 2
              setMydata(temp);
              only reason is that we need data in immutable form 
              now just pushing into array is like pushing the same object 
              again and again
              so state change will go unnoticed.
              hence we have to choose immutable object change style
              it can be done using array as well
              */
              return mypayload;
              
            });
            console.log('temp:- ',projectRef);
            // return temp;
          });
          console.log("members data:-", membersData);
        });

        
        projectRef();
  },[]);
  console.log('te mydata',mydata)
  
  return (
    <div>
      {console.log('inside return:- ',mydata)}
      {mydata.map((project,idx) => (
        <div className="my-4" key={idx}>
          <ProjectSnippet
            key={project.id}
            useremail={props.useremail}
            role={props.role}
            pid={project.id}
            pname={project.projectname}
            pdate={project.createdate}
            pstatus={project.status}
          />
        </div>
      ))}
      
    </div>
  );
};

export default ViewProjects;