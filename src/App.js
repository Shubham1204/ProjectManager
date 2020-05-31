import React, { Component, useState } from 'react';
import db, { auth } from './firebase'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddManager from './components/pages/AddManager';
import AddMember from './components/pages/AddMember';
import AssignMember from './components/pages/AssignMember';
import AssignManager from './components/pages/AssignManager';
import Signin from './components/auth/Signin';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import AddProject from './components/projects/AddProject';
import Projects from './components/projects/Projects';
import Project from './components/projects/Project';
import AddTasks from './components/pages/AddTasks';
import AddTags from './components/pages/AddTags';
import AddLinks from './components/pages/AddLinks';
import EditProject from './components/projects/EditProject';
import TaskStatus from './components/pages/TaskStatus';
import RemoveMember from './components/pages/RemoveMember';
import Profile from './components/pages/Profile';
import RemoveTask from './components/pages/RemoveTask';
import RemoveManager from './components/pages/RemoveManager';
import RemoveLink from './components/pages/RemoveLink';
import UpdateLink from './components/pages/UpdateLink';
import RemoveTag from './components/pages/RemoveTag';
import UpdateTag from './components/pages/UpdateTag';
import Approveproject from './components/pages/Approveproject';
import ViewProject from './components/projects/ViewProject';
import Search from './components/pages/Search';
import ViewProjects from './components/projects/ViewProjects';
import Users from './components/pages/Users/Members';
import Members from './components/pages/Users/Members';
import DeallocateMember from './components/pages/Users/DeallocateMember';
import UpgradeMember from './components/pages/Users/UpgradeMember';
import Managers from './components/pages/Users/Managers';
import DeallocateManager from './components/pages/Users/DeallocateManager';
import ReallocateMember from './components/pages/Users/ReallocateMember';
import UpgradeDowngradeManager from './components/pages/Users/UpgradeDowngradeManager';
import ReallocateManager from './components/pages/Users/ReallocateManager';
import Admins from './components/pages/Users/Admins';
import DeallocateAdmin from './components/pages/Users/DeallocateAdmin';
import ReallocateAdmin from './components/pages/Users/ReallocateAdmin';
import DowngradeAdmin from './components/pages/Users/DowngradeAdmin';

function App() {

  const [user, setUser] = useState(false);
  const [role, setRole] = useState('');

  auth.onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    } else {
      console.log('no user');
    }
  });

  db.collection('user_mst').where("email", "==", `${user.email}`).get().then(snap => {
    snap.forEach(doc => {
      setRole(doc.data().role);

    })
  })

  return (
    <Router>
      <Header useremail={user.email} role={role} />
      {role ? <Sidebar useremail={user.email} role={role} /> : ""}
      <div id="main" className="mt-5 pt-4">
        <Route default exact path="/" ><Signin /></Route>
        <Route path="/addmember" ><AddMember /></Route>
        <Route path="/addmanager" ><AddManager /></Route>
        <Route path="/addproject" ><AddProject useremail={user.email} role={role} /></Route>
        <Route path="/projects">
          {
          role==="admin"
        ?
        <Projects useremail={user.email} role={role} />
        :
        <ViewProjects useremail={user.email} role={role} />
        }
        </Route>
        <Route path="/removetask/:id" ><RemoveTask /></Route>
        <Route path="/removelink/:id" ><RemoveLink /></Route>
        <Route path="/removetag/:id" ><RemoveTag /></Route>
        <Route path="/updatelink/:id" ><UpdateLink /></Route>
        <Route path="/updatetag/:id" ><UpdateTag /></Route>
        <Route path="/profile" ><Profile /></Route>
        <Route path="/admins" ><Admins /></Route>
        <Route path="/members" ><Members /></Route>
        <Route path="/managers" ><Managers /></Route>
        <Route path="/deallocateadmin/:id" ><DeallocateAdmin /></Route>
        <Route path="/reallocateadmin/:id" ><ReallocateAdmin /></Route>
        <Route path="/downgradeadmin/:id" ><DowngradeAdmin /></Route>
        <Route path="/deallocatemember/:id" ><DeallocateMember /></Route>
        <Route path="/reallocatemember/:id" ><ReallocateMember /></Route>
        <Route path="/upgrademember/:id" ><UpgradeMember /></Route>
        <Route path="/deallocatemanager/:id" ><DeallocateManager /></Route>
        <Route path="/upgrademanager/:id" ><UpgradeDowngradeManager /></Route>
        <Route path="/reallocatemanager/:id" ><ReallocateManager /></Route>
        <Route path="/approveproject/:id" ><Approveproject /></Route>
        <Route path="/project/:id" ><Project useremail={user.email} role={role} /></Route>
        <Route path="/viewproject/:id" ><ViewProject useremail={user.email} role={role} /></Route>
        <Route path="/editproject/:id" ><EditProject /></Route>
        <Route path="/assignmember/:id" ><AssignMember /></Route>
        <Route path="/assignmanager/:id" ><AssignManager /></Route>
        <Route path="/addtasks/:id" ><AddTasks /></Route>
        <Route path="/search/:searchvalue" ><Search /></Route>
        <Route path="/taskstatus/:id" ><TaskStatus /></Route>
        <Route path="/removemember/:id" ><RemoveMember /></Route>
        <Route path="/removemanager/:id" ><RemoveManager /></Route>
        <Route path="/addtags/:id" ><AddTags /></Route>
        <Route path="/addlinks/:id" ><AddLinks /></Route>
      </div>
    </Router>
  );
}

export default App;
