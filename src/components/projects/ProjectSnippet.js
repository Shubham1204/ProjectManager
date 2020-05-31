import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ProjectSnippet = (props) => {

  const memberproject = (
      <Link to={`viewproject/${props.pid}`} className="btn btn-lg float-right btn-primary" >View Details</Link>
  );

  const project = (
    <Link to={`project/${props.pid}`} className="btn btn-primary btn-lg float-right">View Details</Link>

  );


  return (
    <div>
      
      <div className="card" >
        <div className="card-header">
          Project Name: {props.pname}
        </div>
        <div className="card-body">

          <p className="card-text float-left" >
            create date: {props.pdate}
            <br></br>
    status: {props.pstatus}
          </p>

          {props.role === "member" ? memberproject : project}


        </div>
      </div>
    </div>
  );
}

export default ProjectSnippet;