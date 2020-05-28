import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import db, { auth } from '../../firebase'
import './head.css'

const Header = (props) => {

  const [searchval, setSearchval] = useState('');
  const history = useHistory();

  const onSearchChange = (event) => setSearchval(event.target.value);

  const onSignout = () => {
    auth.signOut().then(function () {
      console.log("logout");
      history.push("/");

    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  const search = () => {
    console.log("search", searchval);

  }


  const signinlink = (
    <li className="nav-item">
      <a href="/" className="nav-link logout">
        <span className="d-none d-sm-inline">SignIn</span>
        <i className="fa fa-sign-in"></i>
      </a>
    </li>
  );

  const profilelink = (
    <li className="nav-item">
      <span className="d-xs-inline nav-link logout dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.useremail}</span>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <span className="logout nav-link dropdown-item"><i className="fas fa-hat-cowboy"></i>Role: {props.role}</span>
        <Link to="/profile" className="logout nav-link dropdown-item"><i className="fas fa-user"></i>Profile</Link>
        <span className="nav-link logout dropdown-item" onClick={onSignout}>
          <i className="fa fa-sign-out"></i>LogOut</span>
      </div>
    </li>
  );


  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <div className="navbar-holder d-flex align-items-center justify-content-between">

            <div className="navbar-header">
              <a href={props.role ? "/projects" : "/"} className="navbar-brand d-xs-inline-block ml-2">
                <div className="brand-text d-lg-inline-block"><span>Project</span><strong>Manager</strong></div>

              </a>

            </div>
            <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
              <span className="float-left">
                <input type="text" className="fa fa-search form-control" value={searchval} onChange={onSearchChange} placeholder="Search" />
              </span>
              <span className="float-right">
                <Link to={`search/${searchval}`}>
                  <span className="btn" onClick={search}><i className="fa fa-search text-white"></i></span></Link>
              </span>
              {props.useremail ? profilelink : signinlink}
            </ul>
          </div>
        </div>

      </nav>
    </div>
  );
}

export default Header;