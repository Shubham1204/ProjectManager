import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase';
import { useParams, useHistory } from 'react-router-dom';


const UpdateLink = (props) => {

  let { id } = useParams();
  const history = useHistory();

  const [link, setLink] = useState('');
  const [linkname, setLinkname] = useState('');
  const [linkval, setLinkval] = useState('');
  const [linknameval, setLinknameval] = useState('');

  const onLinknameChange = (event) => setLinknameval(event.target.value);
  const onLinkChange = (event) => setLinkval(event.target.value);


  useEffect(() => {


    let projectRef = db.collection('project_link_mapping').doc(id)
    projectRef.get().then(doc => {
      let { link, linkname } = doc.data();
      setLink(link);
      setLinkname(linkname);
    })


  }, [])


  const onAddLinks = () => {
    let postRef = db.collection('project_link_mapping').doc(id)

    postRef.update({
      linkname: linknameval,
      link: linkval
    })
      .then(function () {
        history.goBack();
      })
      .catch(function (error) {
      });



  }


  return (
    <div>

      <div className="card mt-3">
        <div className="card-body">
          <h1>Current Link</h1>
    Link Name: {linkname}<br></br>
    Link: {link}
          <br></br>
          <br></br>
          <span>
            <span className="font-weight-bold mr-5">Update Link  </span>
            <input type="text" className="mx-2" value={linknameval} onChange={onLinknameChange} placeholder="link name" />
            <input type="text" value={linkval} onChange={onLinkChange} placeholder="web address" />
            <button className="mx-2 btn btn-primary" onClick={onAddLinks}>Add Link</button>
          </span>
        </div>
      </div>


    </div>
  );
}

export default UpdateLink;