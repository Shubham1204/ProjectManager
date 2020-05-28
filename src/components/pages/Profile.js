import React, { Component, Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import db, { auth } from '../../firebase'

const Profile = (props) => {

  console.log('header ', props.useremail, props.role)


  return (
    <div>
  <h1>profile</h1>
    </div>
  );
}

export default Profile;