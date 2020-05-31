import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase';
import { useParams, Link, useHistory } from 'react-router-dom';


const RemoveTag = (props) => {

  const history = useHistory();

  let { id } = useParams();


  const [tag, setTag] = useState('');

  useEffect(() => {



    let projectRef = db.collection('project_tag_mapping').doc(id)
    projectRef.get().then(doc => {
      let { tag } = doc.data();
      setTag(tag);
    })

  }, [])


  const onRemoveTag = () => {
    db.collection('project_tag_mapping').doc(id).delete().then(function () {
      history.goBack();
    }).catch(function (error) {
    });
  }


  return (
    <div>

      <h1>current tag:</h1>

      <h4>tag: {tag}</h4>


      <button onClick={onRemoveTag}>Remove tag</button>

    </div>
  );
}

export default RemoveTag;