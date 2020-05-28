import React, { useState, useEffect } from 'react';
import db, { auth } from '../../firebase'
import { Link, useHistory } from 'react-router-dom';

const Signin = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);


  const [user, setUser] = useState('');


  const history = useHistory();

  const onSignin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('done');
        history.push("/projects");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
        setError(errorMessage);
      });
  }



  return (
    <div>

      <div className="container mt-2">
        <div className="row justify-content-center align-items-center text-center p-2">
          <div className="m-1 col-sm-8 col-md-6 col-lg-4 shadow-sm p-3 mb-5 bg-white border rounded">
            <div className="pt-5 pb-5">

              <img className="rounded mx-auto d-block" src="https://freelogovector.net/wp-content/uploads/logo-images-13/microsoft-cortana-logo-vector-73233.png" alt="" width="70px" height="70px" />
              <p className="text-center text-uppercase mt-3">Login</p>
              <div className="form-group input-group-md">
                <input type="text" className="form-control" placeholder="Email" value={email} onChange={onEmailChange} />

              </div>
              <div className="form-group input-group-md">
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={onPasswordChange} />
              </div>
              <button className="btn btn-lg btn-block btn-primary my-4" onClick={onSignin}>Sign In</button>
              <h6>{error}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;