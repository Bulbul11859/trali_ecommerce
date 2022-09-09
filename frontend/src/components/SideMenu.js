import React from 'react'
import { Sidenav, Nav, Dropdown,Toggle } from 'rsuite';

import { Icon } from 'rsuite'
import { Link } from "react-router-dom";




const SideMenu = () => {
    const [expanded, setExpanded] = React.useState(true);
    const [activeKey, setActiveKey] = React.useState('1');
  return (
    <div style={{ width: 240 }}>
    <Toggle
   onChange={setExpanded}
   checked={expanded}
   checkedChildren="Off Dashboard"
   unCheckedChildren="Open Dashboard"
 />
 <hr />
 <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
   <Sidenav.Body>
     <Nav activeKey={activeKey} onSelect={setActiveKey}>
       <Nav.Item eventKey="1" icon={<i class="fa-solid fa-users" ></i>} >
       <Link to="" style={{textDecoration: 'none' }}> Product Upload</Link>
        
       </Nav.Item>
       <Nav.Item eventKey="2" icon={<i class="fa-solid fa-users"></i>}>
         User Group
       </Nav.Item>
       <Nav.Item eventKey="3">Settings</Nav.Item>

        <Dropdown eventKey="4" title="Advanced">
              <Dropdown.Item eventKey="4-1">Privacy</Dropdown.Item>
              <Dropdown.Item eventKey="4-2">About</Dropdown.Item>
              <Dropdown.Item eventKey="4-3">Terms</Dropdown.Item>
        </Dropdown>
     
     </Nav>
   </Sidenav.Body>
   <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
 </Sidenav>
</div>
  )
}

export default SideMenu