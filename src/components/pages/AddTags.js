import React, {useState,useEffect} from 'react';
import db from '../../firebase';
import {useParams,useHistory} from 'react-router-dom';
// import Posts from '';
// import './App.css';


const AddTags = (props) => {

    let { id } = useParams();

    const history = useHistory();
    // console.log('create',props.user.uid)
    
    const [role,setRole] = useState('');
    const [assigned,setAssigned] = useState('');
    const [memberval,setMember] = useState('');
    const [projectname,setProjectname] = useState('');
    const [status,setStatus] = useState('');
    const [createdate,setCreatedate] = useState('');
      const [description,setDescription] = useState('');
      const [tags,setTags] = useState([]);
      const [tagval,setTagval] = useState('');
    
    const onTagChange = (event) => setTagval(event.target.value);
    

    useEffect(()=> {

    

        let projectRef = db.collection('project_mst').doc(id)
        // console.log(id);
        projectRef.get().then(doc =>{
        //  console.log(doc.data());
          let {projectname,status,createdate,description} = doc.data()
            setProjectname(projectname);
            setStatus(status);
            // setMembers(members);
            setCreatedate(createdate);
            setDescription(description);
          
          
            // console.log(projectname,status,createdate,description,members,tags,tasks,links,approved,assignedmanager)
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



    // let postRef = db.collection('user_mst').where("assigned","==","no").where("role","==","manager").get().then(snap => {
    //     snap.forEach(doc => {
    //         // console.log('shubham    ',doc.data());
    //         // console.log('shubham name   ',doc.data().name);
    //         // setName(doc.data().name);
    //         // setSkill(doc.data().skill);
    //         console.log(doc.data().username);
    //     })
    // })
                                        const onAddTags = () => {
                                            // console.log('inside assign',memberval);
        // console.log(content);
        var projectid= id;
        var tag = tagval;
        let postRef = db.collection('project_tag_mapping');
        let payload = {projectid,tag}
        // console.log(payload)
        // console.log(role);
        postRef.add(payload)
        .then(function(file){
            // updateassignedstatus();
            console.log("doc",file);
            history.goBack();
        })
        // setTitle('')
        // setContent('')
        // setUserid('')
        // navigate('/')
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
              // content={post.content}
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