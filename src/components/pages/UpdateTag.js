import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase';
import { useParams, useHistory } from 'react-router-dom';


const UpdateTag = (props) => {

  let { id } = useParams();
  const history = useHistory();

  const [tag, setTag] = useState('');
  const [tagval, setTagval] = useState('');
  const onTagvalChange = (event) => setTagval(event.target.value);


  useEffect(() => {


    let projectRef = db.collection('project_tag_mapping').doc(id)
    projectRef.get().then(doc => {
      let { tag } = doc.data();
      setTag(tag);
    })


  }, [])


  const onUpdateTag = () => {
    let postRef = db.collection('project_tag_mapping').doc(id)

    postRef.update({

      tag: tagval
    })
      .then(function () {
        console.log("Document successfully updated!");
        history.goBack();
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });

  }


  return (
    <div>

      <div className="card mt-3">
        <div className="card-body">
          <h1>Current tag</h1>

    Tag: {tag}
          <br></br>
          <br></br>
          <span>
            <span className="font-weight-bold mr-5">Update Link  </span>
            <input type="text" className="mx-2" value={tagval} onChange={onTagvalChange} placeholder="tag" />
            <button className="mx-2 btn btn-primary" onClick={onUpdateTag}>Update Tag</button>
          </span>
        </div>
      </div>


    </div>
  );
}

export default UpdateTag;