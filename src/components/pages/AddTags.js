import React, {useState,useEffect} from 'react';
import db from '../../firebase';
import {useParams,useHistory} from 'react-router-dom';


const AddTags = (props) => {

    let { id } = useParams();

    const history = useHistory();
    
    const [projectname,setProjectname] = useState('');
    const [status,setStatus] = useState('');
    const [createdate,setCreatedate] = useState('');
      const [description,setDescription] = useState('');
      const [tags,setTags] = useState([]);
      const [tagval,setTagval] = useState('');
    
    const onTagChange = (event) => setTagval(event.target.value);
    

    useEffect(()=> {

    

        let projectRef = db.collection('project_mst').doc(id)
        projectRef.get().then(doc =>{
          let {projectname,status,createdate,description} = doc.data()
            setProjectname(projectname);
            setStatus(status);
            setCreatedate(createdate);
            setDescription(description);
        })   
        
        db.collection('project_tag_mapping').where("projectid","==",`${id}`)
        .onSnapshot(async tags =>{
            let tagsData = await tags.docs.map(tag =>{
                let data = tag.data()
                let {id} = tag
                let payload ={
                    id,
                    ...data
                }
                return payload
            });
            setTags(tagsData)
        })
    },[])



                                        const onAddTags = () => {
        var projectid= id;
        var tag = tagval;
        let postRef = db.collection('project_tag_mapping');
        let payload = {projectid,tag}
        postRef.add(payload)
        .then(function(file){
            console.log("doc",file);
            history.goBack();
        })
    }
   

  return (
    <div>
           <div class="card">
  <div class="card-body">
    <span className="float-left"><span className="font-weight-bold">Project name : </span> {projectname}</span>
    <span className="float-left text-success font-weight-bold mx-5">Status: {status}</span>
  </div>
</div>
<div className="card mt-3">
  <div className="card-body">
 <p><span className="font-weight-bold">Project name :</span>{projectname}</p>
    <p><span className="font-weight-bold">Date Created :</span> {createdate}</p>
    <p><span className="font-weight-bold">Description :</span> {description}</p>
    <p><span className="font-weight-bold">Tags : </span>
    {tags.map(tag =>  (
              <span className="btn btn-outline-secondary mx-2" key={tag.tag}> {tag.tag}</span>        
              ))}
              </p>
    <span>
        <span className="font-weight-bold mr-5">Add Tags  </span>
        <input type="text" value={tagval} onChange={onTagChange} placeholder="tag name" />         
        <button className="mx-2 btn btn-primary" onClick={onAddTags}>Add tag</button> 
    </span>

    </div>
    </div>
      
  
    </div>
  );
}

export default AddTags;