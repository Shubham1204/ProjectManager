import React, { useState, useEffect } from 'react';
// import PostSnippet from './PostSnippet';
import db,{auth} from '../../firebase'
// import './signin.css';
import {Link,useHistory,useParams } from 'react-router-dom';

const Search = (props) => {
  
  let { searchvalue } = useParams();
  const history = useHistory();

  

  return (
    <div>
     <h1>search: {searchvalue}</h1>
    </div>
  );
  }

export default Search;