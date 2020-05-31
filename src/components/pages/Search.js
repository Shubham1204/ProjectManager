import React, { useState, useEffect } from 'react';
import db,{auth} from '../../firebase'
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