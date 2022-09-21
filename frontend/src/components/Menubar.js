import React,{useState,useContext} from 'react'
import { Store } from '../Store';
import { Navbar, Nav, Dropdown, Container,Drawer,Panel, Placeholder, Stack, ButtonGroup, Button,Grid, Row, Col,Message  } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { Twirl as Hamburger } from 'hamburger-react'



const Menubar = () => {

  const [open, setOpen] =useState(false);
//humburger
  const [isOpen, setIsOpen] = useState(false)

  const[activeproductsize,setProductSize]=useState('')
  const[activeproductsizeId,setProductSizeId]=useState('')
  console.log(activeproductsizeId)
  

  console.log(isOpen)


  const{state,dispatch,cartstate,cartdispatch}=useContext(Store)

  const {cart}=cartstate

  console.log(cart.cartItems)
  
  console.log("ami Menu",state)
  let {userInfo}=state

  let handleLogout=()=>{
     dispatch({type:'USER_LOGOUT'})
     localStorage.removeItem('userInfo')
  }

  let handleAddQuantity=(product)=>{
    console.log(product.price)
   
   
    const quantity=product.quantity+1
    const price=product.price*2
   
    
    cartdispatch({
      type:'ADD_TO_CART',
      payload:{...product,quantity,price}
    })
   
  }

  let handleSubQuantity=(product)=>{
    console.log(product)
   
   if(product.quantity>1){
    const quantity=product.quantity-1
    const price=product.price/2
   
    
    cartdispatch({
      type:'ADD_TO_CART',
      payload:{...product,quantity,price}
    })
   
   }
  
  }

  let handleRemoveCart=(product)=>{
    cartdispatch({
      type:'REMOVE_TO_CART',
      payload:{...product}
    })
  }

  let handleProductSize=(id)=>{
     console.log(id)
     setProductSize(id)
  }

  let handleCartClear=()=>{
    cartdispatch({
      type:'CLEAR_CART'
      
    })
  }

  

  
  return (
    <>
   <div className='Menubar_nav'>
   <div className={`${
            isOpen ? "Menubar_mobile_banner" : "Menubar_mobile_banner2"
          }`}></div>
    <Container className='container'>
    <Navbar className='menu'>
    <Navbar.Brand href="#" className='logo_font'>
    <Link to="/" className='login_trali' style={{ textDecoration: 'none' }}>
    <i className="fa-solid fa-cart-flatbed-suitcase"></i>
    
    Trail
    </Link>
    </Navbar.Brand>
    <Hamburger size={20}  className='nav_humburger'toggled={isOpen} toggle={setIsOpen}/>
    <div  className={`${
            isOpen ? "nav_mobile" : "nav_mobile2"
          }`} >
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
      <span onClick={()=>setOpen(true)} className="round_box">
      <i className="fa-solid fa-cart-shopping icon"></i>
      <span className='round'>{cart.cartItems.length}</span>
      </span>
     
      </div>
     
    </Nav>
    </div>
  </Navbar>
 

  <Drawer size="full" open={open} onClose={() => setOpen(false)} style={{zIndex:"7777777"}}>
        <Drawer.Body>
        {cart.cartItems.length>0?
        <>
         {cart.cartItems.map((item)=>(
          <>
          
            <Panel bordered style={{marginBottom:"20px"}}>
            <Row className="show-grid">
              <Col xs={16}> 
              <Col xs={12}>   <img src={item.image} style={{width:'100px'}}></img></Col>

              <Col xs={12}>   <div style={{marginTop:"5px"}}>
              <p >{item.name}</p>
                    <p >brand:{item.brandname}</p> 
              <p >Product Size:<span style={{marginLeft:"10px"}}>{item.size}</span>

              {/* {item.productsize.map(size=>(
                
                  
                <span  className={activeproductsizeId==item._id?activeproductsize==size?"Drawer_sizeProduct_active":"Drawer_sizeProduct":'Drawer_sizeProduct'} onClick={()=>{setProductSize(size); setProductSizeId(item._id)} }>{size}</span>
              
                ))} */}
              </p>
              <p>Product color:<p style={{display:"inline-block",borderRadius:"50%",  width: "10px",marginLeft:"10px", height: "10px", background:`#${item.color}`}}></p></p>
              </div></Col>
           

            
              </Col>
              <Col xs={8}>
              <div style={{textAlign:"center",color:"#05297F",fontSize:"16px"}}>
               <span style={{color:"#05297F",fontSize:"25px"}}>৳ </span>{item.price}
              </div>
               <div  style={{textAlign:"center"}}>
               <Button style={{marginRight:"15px"}} onClick={()=>handleSubQuantity(item)}>-</Button>
               <span>{item.quantity}</span>
               <Button  style={{marginLeft:"15px"}}  onClick={()=>handleAddQuantity(item)}>+</Button>
               </div>
               <p style={{textAlign:"right"}} onClick={()=>handleRemoveCart(item)}><i style={{color:"red",cursor:"pointer",fontSize:"20px"}}  class="fa-regular fa-trash-can"></i></p>
              </Col>
             
          </Row>
             
            </Panel>
          </>
         ))}
          <div style={{textAlign:"right"}}>
        <Button color="orange" appearance="primary" style={{marginRight:"20px"}} onClick={handleCartClear}>  Clear All Cart </Button>
        <Link to='/cart'>
        <Button color="#FC9D9D" appearance="primary" onClick={() => setOpen(false)}>  Go To Cart page </Button>
        </Link>
        </div>
         </>
        :
        <Message type="success" style={{marginBottom:"30px",textAlign:"center"}}>Cart Is Empty</Message>
          }
        

       
        </Drawer.Body>
       
      </Drawer>
  </Container>
 
  </div>
    </>
  )
}

export default Menubar