import React, { useState, useEffect } from "react";
import ProjectSnippet from "./ProjectSnippet";
import db from "../../firebase";
// import './App.css';

const Projects = (props) => {
  
  const [projects, setProjects] = useState([]);
  useEffect(() => {
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

    },[])

  // console.log('page load',projects)
  return (
    <div>
      {/* {console.log(projects)} */}
      {projects.map((project) => (
        // <h1>{project.id} {project.projectname}</h1>
        <div className="my-4" key={project.id}>
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

export default Projects;