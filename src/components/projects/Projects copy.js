import React, { useState, useEffect } from 'react';
import ProjectSnippet from './ProjectSnippet';
import db from '../../firebase'
// import './App.css';

const Projects = (props) => {

    const [projects,setProjects] = useState([])
    const [search,setSearch] = useState('');
    // const [proj,setProj] = useState([]);
    // const [projectsdata,setProjectsData] = useState([])

    // const onSearchChange = (event) => {setSearch(event.target.value);
    // console.log(search)
    // }
    // console.log('projects.js',props.useremail)

    useEffect(() => {
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
    //         // console.log(id,data.email)
            
    //         // return payload
    //         let projectRef = db.collection('project_mst').doc(data.projectid)
    // // console.log(id);
    // projectRef.get().then(doc =>{
    // //  console.log(doc.data());
    // //   let {projectname,status,createdate,description,approved} = doc.data()
    //     // setProjectname(projectname);
    //     // setStatus(status);
    //     // setCreatedate(createdate);
    //             console.log(doc.id);
    //             proj = doc.data();
    //             setProjectsData(proj);
    // })
    //     //     db.collection("project_mst").doc(data.projectid)
    //     //     .get()
    //     //     .then(function(querySnapshot) {
    //     //         // querySnapshot.forEach(function(doc) {
    //     //             // doc.data() is never undefined for query doc snapshots
    //     //             // console.data.projectlog(doc.id, " => ", doc.data());
    //     //             //     console.log('update asign',email);
    //     //             // db.collection('user_mst').doc(doc.id).update({
    //     //             //   assigned:"no"
    //     //             // })
    //     //             // .then(function () {
    //     //             //   console.log("Document successfully updated!");
    //     //             //   // history.goBack();
    //     //             // })
    //     //     //   .catch(function (error) {
    //     //     //     // The document probably doesn't exist.
    //     //     //     console.error("Error updating document: ", error);
    //     //     //   });
    //     //     // });
    //     // })
    //     .catch(function(error) {
    //         console.log("Error getting documents: ", error);
    //     });
    //       });
    //       // setTasks(tasksData)
    //     })





















        // db.collection('project_member_mapping').where("email", "==", `${props.useremail}`)
        // .onSnapshot(async members => {
        //     console.log('inside',props.useremail)
        //   let membersData = await members.docs.map(member => {
        //     let pdata = member.data();
        //     // let { id } = member
        //     // let payload = {
        //     //   id,
        //     //   ...data
        //     // }
        //     console.log('pdata',pdata.projectid)
            
        //     // return payload
        //     db.collection('project_mst').doc(pdata.projectid)
        //     .onSnapshot(async projects =>{
        //         let projectsData = await projects.docs.map(project =>{
        //             let data = project.data()
        //             let {id} = project
        //             let payload ={
        //                 id,
        //                 ...data
        //             }
        //             return payload
        //         });
        //         setProjects(projectsData)
        //     })
        // .catch(function(error) {
        //     console.log("Error getting documents: ", error);
        // });
        //   });
        //   // setTasks(tasksData)
        // })


















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
    
    
    // useEffect(() => {
    //     // const results = people.filter(person =>
    //     //   person.toLowerCase().includes(searchTerm)
    //     // );
    //     // setSearchResults(results);
    //     setProjects(filterProjects);
    //   }, [search]);


    //     let postRef = db.collection('post_msrt')

    //     postRef.get().then(posts =>{
    //         posts.forEach(post =>{
    //         let data = post.data()
    //         let {id} = post
    //         // console.log('this is the post')
    //         // console.log(data);

    //         let payload = {
    //             id,
    //             ...data
    //         }
    //         // console.log(payload);
    //         setPosts((posts) => [...posts,payload])
    //     })
    // })


  return (
    <div>
        {/* {console.log('snippet',props.role)} */}
        {/* <input type="text" value={search} onChange={onSearchChange} placeholder="search"></input> */}
        {/* {getdata()} */}
      
        {/* {projectsdata.description }{projectsdata.status} */}
            {projects.map(project =>  (
                <div className="my-4" key={project.id}>
                    {/* {console.log("me",project)} */}
                <ProjectSnippet key={project.id}  useremail={props.useremail} role={props.role} pid={project.id} pname={project.projectname} pdate={project.createdate} pstatus={project.status} /> 
            {/* // <h1>{project.projectname}</h1>        content={post.content} */}
            </div>
            ))}
    </div>
  );
}

export default Projects;