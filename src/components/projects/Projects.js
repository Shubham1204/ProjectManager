import React, { useState, useEffect } from 'react';
import ProjectSnippet from './ProjectSnippet';
import db from '../../firebase'
// import './App.css';

const Projects = (props) => {

    const [projects,setProjects] = useState([])
    const [search,setSearch] = useState('');
    // const [proj,setProj] = useState([]);
    const [projectsdata,setProjectsData] = useState([])

    // const onSearchChange = (event) => {setSearch(event.target.value);
    // console.log(search)
    // }
    // console.log('projects.js',props.useremail)

  useEffect(()=>{
        // console.log("---------------------------");
        // console.log(props);



    //     db.collection('project_member_mapping').where("email", "==", `${props.useremail}`)
    //     .onSnapshot(async members => {
    //       let membersData = await members.docs.map(member => {
    //         let data = member.data()
    //         let { id } = member
    //         let payload = {
    //           id,
    //           ...data
    //         }
    //         let projectRef = db.collection('project_mst').doc(data.projectid)
    // projectRef.get().then(doc =>{
    //             console.log(doc.id);
    // })
    //     .catch(function(error) {
    //         console.log("Error getting documents: ", error);
    //     });
    //       });
    //     })
        
    
    //chennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnaaaaaaaaaaaaaaaaaaaaaaaa
    
//     db.collection('project_member_mapping').where("email", "==", `${props.useremail}`)
//         .onSnapshot(async members => {
//           let membersData = await members.docs.map(member => {
//             let data = member.data()
//             let { id } = member
//             let payload = {
//               id,
//               ...data
//             }
//             let docRef = db.collection("project_mst").doc(data.projectid).get().then(function(doc) {
//     if (doc.exists) {
//         console.log("Document data:", doc.id,doc.data());
//         let data = doc.data()
//                 let {id} = doc
//                 // console.log
//                 let payload ={
//                     id,
//                     ...data
//                 }
//                 // console.log(payload)
//                 // setProjectsData(oldpayload =>  [new Set([...oldpayload, payload])])
//                   // {
//                 // if(oldpayload === payload){
//                 //   console.log("s");
//                 // } else{ 
                 
//                 // }
//               // }
//               // );
//                 setProjectsData(oldpayload => [...new Set([...oldpayload,payload])])
                
//                 // setProjectsData(payload);
              
//                 console.log("pay",payload)
//                 return payload

//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
//     // return payload
//     // setProjects(docRef);

// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });
// // setProjectsData(Array.from(new Set(projectsdata)));
// // console.log('sam',projectsdata)
//             // let projectRef = db.collection('project_mst').doc(data.projectid).get().then(doc =>{
//             // let getdata = doc.data()
//             // let getid = doc.id;
//             //             // console.log("dociddddddd",doc.id);
//             //             // console.log('datttttttttt',doc.data())
//             // let payload ={
//             //                 getid,
//             //                 ...getdata
//             //             }
//             //             setProjects(payload)
//             //             console.log("----------------------")
//             //             console.log('sanju',projects);
//             //             console.log("----------------------")
//             //             return projects
//             //         })
//                     // setProjectsData(projectRef.data())
                    
//                     // console.log('pay',projects)
//                     // console.log('pay2',projectsdata)
//                     setProjects(projectsdata);
//           });
//         })

        // db.collection('project_mst')
        // .onSnapshot(async projects =>{
        //     let projectsData = await projects.docs.map(project =>{
        
        //         let data = project.data()
                  
        //         let {id} = project
        //         // console.log
        //         let payload ={
        //             id,
        //             ...data
        //         }
        //         console.log("payyyyyyyload",data)
        //         return payload
        //     });
        //     setProjects(projectsData)
        // })
//chennnnnnnnnnnnnnnnnnnnnnnaaaaaaaaaaaaaaaaaaaaaaaa

        db.collection('project_mst')
        .onSnapshot(async projects =>{
            let projectsData = await projects.docs.map(project =>{
                let data = project.data()
                let {id} = project
                let payload ={
                    id,
                    ...data
                }
                // console.log(data)
                return payload
            });
            setProjects(projectsData)
        })

    })

    // function removedup (data){
    //   let unique = [];
    //   data.forEach(element => {
    //     if(!unique.includes(element)){
    //       unique.push(element)
    //     }
    //   });
    //   return unique;
    // }
  
    
// console.log('ank',[...new Set(projects)]);

   
  return (
    <div>
        {/* {console.log('snippet',props.role)} */}
        {/* <input type="text" value={search} onChange={onSearchChange} placeholder="search"></input> */}
        {/* {funct()} */}
      {/* <h1>kjfn{projects.id}</h1> */}
        {/* {projectsdata.description }{projectsdata.status} */}
                {projects.map(project =>  (
                    <div className="my-4" key={project.id}>
                        
                    <ProjectSnippet key={project.id}  useremail={props.useremail} role={props.role} pid={project.id} pname={project.projectname} pdate={project.createdate} pstatus={project.status} /> 
                
                </div>
                ))}
    </div>
  );
}

export default Projects;