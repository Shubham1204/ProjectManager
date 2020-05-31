import React, { Component, Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import db, { auth } from '../../firebase'
import './sidebar.css'
import $ from 'jquery'

const Sidebar = (props) => {

  // console.log('header ', props.useremail, props.role)
  const [mini, setMini] = useState(true);
  // var mini = true;

  const toggleSidebar = () => {
    if (mini) {
      // console.log("opening sidebar");
      document.getElementById("mySidebar").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
      // this.mini = false;
      setMini(false);
    } else {
      // console.log("closing sidebar");
      document.getElementById("mySidebar").style.width = "85px";
      document.getElementById("main").style.marginLeft = "85px";
      // this.mini = true;
      setMini(true);
    }
  }

  const adminlinks = (
    <Fragment>
      <Link to="/addproject" ><span><i className="fas fa-folder-plus"></i><span className="ml-3 icon-text">Add Project</span></span></Link>
      <Link to="/addmanager"><span><i className="fas fa-user-tie"></i><span className="ml-3 icon-text">Add Manager</span></span></Link>
      <Link to="/addmember"><span><i className="fas fa-users"></i><span className="ml-3 icon-text">Add Member</span></span></Link>
      <Link to="/admins"><span><i className="fas fa-users"></i><span className="ml-3 icon-text">View Admins</span></span></Link>
      <Link to="/members"><span><i className="fas fa-users"></i><span className="ml-3 icon-text">View Members</span></span></Link>
      <Link to="/managers"><span><i className="fas fa-users"></i><span className="ml-3 icon-text">View Managers</span></span></Link>
    </Fragment>
  );

  const managerlinks = (
    <Fragment>
    <Link to="/addmember"><span><i className="fas fa-users"></i><span className="ml-3 icon-text">Add Member</span></span></Link>
    <Link to="/members"><span><i className="fas fa-users"></i><span className="ml-3 icon-text">View Members</span></span></Link>
    </Fragment>
  );

  return (
    <div>
      <div id="mySidebar" className="sidebar bg-white" onMouseOver={toggleSidebar} onMouseOut={toggleSidebar}>
        <h4 className="ml-2">Home</h4>
        <Link to="/projects"><span><i className="fas fa-puzzle-piece"></i><span className="ml-3 icon-text">Projects</span></span></Link>
        {props.role == "admin" ? adminlinks : ""}
        {props.role == "manager" ? managerlinks : ""}
      </div>
    </div>
  );
}


export default Sidebar;