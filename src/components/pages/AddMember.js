import React, {useState} from 'react';
import db,{auth} from '../../firebase';
import {useHistory} from 'react-router-dom';
// import Posts from '';
// import './App.css';

const AddMember = (props) => {

    const history = useHistory();

    // console.log('create',props.user.uid)
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [contact,setContact] = useState('');
    const [role,setRole] = useState('');
    const [assigned,setAssigned] = useState('');
    const [error,setError] = useState('');

    const onUsernameChange = (event) => setUsername(event.target.value);
    const onEmailChange = (event) => setEmail(event.target.value);
    const onPasswordChange = (event) => setPassword(event.target.value);
    const onContactChange = (event) =>{ setContact(event.target.value);
        // setUserid(props.user.uid);
        setRole('member');
        setAssigned('no');
        // console.log(role)
        // console.log('insid ecreate post ',userid);
    }
    
    const onAddMember = () => {
       
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
        //   setName('')
        //   setUserid('')
        //   setSkill('')
         setuserdata();
          console.log('done');
         
        })
        .catch(function(error) {
          // Handle Errors here.
        //   var errorCode = error.code;
          var errorMessage = error.message;
          // console.log(errorMessage);
          // console.log(errorCode);
          setError(errorMessage);
        });

    }

    const onSignout = () =>{
      auth.signOut().then(function() {
          // Sign-out successful.
          console.log("logout");
          history.push("/");
        }).catch(function(error) {
          // An error happened.
          var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
        });
  }

    const setuserdata = () =>{

    
        
        let postRef = db.collection('user_mst')
        let payload = {username,email,contact,role,assigned}
        // console.log(payload)
        // console.log(payload);
        postRef.add(payload)
        .then(function(file){
            console.log("doc",file)
            onSignout();
            history.push("/");
        })

    }

    //     // console.log(content);
    //     let postRef = db.collection('user_mst');
    //     let payload = {username,email,password,contact,role,assigned}
    //     // console.log(payload)
    //     console.log(role);
    //     postRef.add(payload)
    //     .then(function(file){
    //         console.log("doc",file)
    //     })
    //     // setTitle('')
    //     // setContent('')
    //     // setUserid('')
    //     // navigate('/')
    // }

  return (
    <div>
        {error}
        <h3>Add Member</h3>
        <h5>Name</h5>
        <input type="text" value={username} onChange={onUsernameChange} />
        <h5>Email</h5>
        <input type="email" value={email} onChange={onEmailChange} />
        <h5>contact Number</h5>
        <input type="text" value={contact} onChange={onContactChange} />
        <h5>password</h5>
        <input type="password" value={password} onChange={onPasswordChange} />
        
        <button onClick={onAddMember}>Add member</button>
    </div>
  );
}

export default AddMember;