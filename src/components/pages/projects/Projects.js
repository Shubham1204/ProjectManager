import React, { useState, useEffect } from "react";
import ProjectSnippet from "./ProjectSnippet";
import db from "../../firebase";

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
            return payload
        });
        setProjects(projectsData)
    })

    },[])

  return (
    <div>
      {projects.map((project) => (
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