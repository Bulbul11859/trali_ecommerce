import React,{useState,useContext} from 'react'
import { Store } from '../Store';
import { Navbar, Nav, Dropdown, Container,Drawer,Panel, Placeholder, Stack, ButtonGroup, Button,Grid, Row, Col  } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


const Menubar = () => {

  const [open, setOpen] =useState(false);


  const{state,dispatch,cartstate}=useContext(Store)

  const {cart}=cartstate

  console.log(cart.cartItems)
  
  console.log("ami Menu",state)
  let {userInfo}=state

  let handleLogout=()=>{
     dispatch({type:'USER_LOGOUT'})
     localStorage.removeItem('userInfo')
  }

  

  
  return (
    <>
   
    <Container className='container'>
    <Navbar className='menu'>
    <Navbar.Brand href="#" className='logo_font'>
    <Link to="/" className='login_trali' style={{ textDecoration: 'none' }}>
    <i className="fa-solid fa-cart-flatbed-suitcase"></i>
    
    Trail
    </Link>
    </Navbar.Brand>
    <Nav className='nav_middle'>
      <Nav.Item >Home</Nav.Item>
      <Nav.Item>Pages</Nav.Item>
      <Nav.Item>Blog</Nav.Item>
      <Nav.Item>Contact</Nav.Item>
      {!state.userInfo
        &&
      <Nav.Item>
        
      <Link to="login" style={{textDecoration: 'none', color: "#161616" }}>Login</Link></Nav.Item>
        }
    </Nav>
    <Nav pullRight className='navicon'>
      <div  className='nn'>
        {state.userInfo&&
          <Dropdown  title={ <i className="fa-regular fa-circle-user icon"></i>}>
          <Dropdown.Item>{state.userInfo.name}</Dropdown.Item>
          <Dropdown.Item>
            {userInfo.isVendor?
              <Link to="dashboard" style={{textDecoration: 'none', color: "#161616" }}>Go to Dashboard</Link>

            :
            <Link to="vendor" style={{textDecoration: 'none', color: "#161616" }}>Become A Vendor</Link>
            } 
           
          </Dropdown.Item>
          <Dropdown.Item>Download As...</Dropdown.Item>
          <Dropdown.Item>Export PDF</Dropdown.Item>
          <Dropdown.Item>Export HTML</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown>
        }
    
      <i className="fa-regular fa-heart icon"></i>
      <i className="fa-solid fa-scale-balanced icon"></i>
      <span onClick={()=>setOpen(true)}>
      <i className="fa-solid fa-cart-shopping icon"></i>
      <span className='round'>{cart.cartItems.length}</span>
      </span>
     
      </div>
    </Nav>
  </Navbar>
 

  <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Body>
         {cart.cartItems.map((item)=>(
          <>
            <Panel bordered>
            <Row className="show-grid">
              <Col xs={16}> 
              <Col xs={12}>   <img src={item.image} style={{width:'100px'}}></img></Col>

              <Col xs={12}>   <div style={{marginTop:"5px"}}>
              <p >{item.name}</p>
                    <p >brand:{item.brandname}</p>
              </div></Col>
           

            
              </Col>
              <Col xs={8}>
              <div style={{textAlign:"center",color:"#f57224",fontSize:"20px"}}>
               <span style={{color:"#f57224",fontSize:"25px"}}>৳ </span>{item.price}
              </div>
              
               <div  style={{textAlign:"center"}}>
               <button style={{marginRight:"15px"}}>+</button>
               <span>{item.quantity}</span>
               <button  style={{marginLeft:"15px"}}>-</button>
               </div>
              </Col>
          </Row>
             
            </Panel>
          </>
         ))}
        </Drawer.Body>
      </Drawer>
  </Container>
 
    </>
  )
}

export default Menubar