import React,{Component, Fragment} from 'react';
import {Link,Redirect} from 'react-router-dom';
import db,{auth} from '../../firebase'

const Headerc = (props) => {

console.log('header ',props.useremail,props.role)


  return (
    <div>
     
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
  
    <ul className="navbar-nav">
      <li className="nav-item active mr-5">
      <Link to="/" >Login</Link>
      </li>
      
      {props.role=='admin' &&
      <Fragment>
        <li className="nav-item active mr-5">
      <Link to="/addmember" >Add member</Link>
      </li>
      <li className="nav-item active mr-5">
      <Link to="/addproject" >Add project</Link>
      </li>
      <li className="nav-item active mr-5">
      <Link to="/addmanager" >Add manager</Link>
      </li>
      </Fragment>
}

      <li className="nav-item active mr-5">
      <Link to="/projects" >Projects</Link>
      </li>
      <li className="nav-item active mr-5">
      <Link to="/profile" >Profile</Link>
      </li>
    </ul>
    {props.useremail}
  </div>
</nav>
    </div>
  );
}

export default Headerc;