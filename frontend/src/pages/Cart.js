import React, { useContext, useState } from 'react'
import { Store } from '../Store'
import { Grid, Row, Col,Input,Button, DateRangePicker } from 'rsuite';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';




const Cart = () => {

    //dhaka zip code 1000-1361
    //naryangonj zip code 1400-1470
    let cost=0
    const [zipecode,setZipcode]=useState('')
    const [cuponcode,setCuponcode]=useState('')
    const [discountcupon,setDiscountcupon]=useState('')

    

    if(zipecode>1000 && zipecode<1360){
      cost=50
     
    }
    else if(zipecode>=1400 && zipecode<=1470){
      cost=100
     
    }
    else if(zipecode==''){
      cost=0
    }
    else{
      cost=150
     
    }

    let {cartstate,cartdispatch}=useContext(Store)
    const {cart}=cartstate

    console.log(cart.cartItems)

   

    const Total_price = cart.cartItems.reduce(
      (previousValue, currentValue) => previousValue + currentValue.price2,
      0,
    );

    let order_total=Total_price+cost

    let order_discount_total=(order_total-((order_total*discountcupon)/100))
    
  
   
    let handleAddQuantity=(product)=>{
      console.log(product)
     
     
      const quantity=product.quantity+1
      const price2=product.price*quantity
     
      
      cartdispatch({
        type:'ADD_TO_CART',
        payload:{...product,quantity,price2}
      })
     
    }

    let handleSubQuantity=(product)=>{
      console.log(product)
     
     if(product.quantity>1){
      const quantity=product.quantity-1
      const price2=product.price2-product.price
     
      
      cartdispatch({
        type:'ADD_TO_CART',
        payload:{...product,quantity,price2}
      })
     
     }
    
    }

    let handleRemoveCart=(product)=>{
      cartdispatch({
        type:'REMOVE_TO_CART',
        payload:{...product}
      })
    }
  


    let handleCartClear=()=>{
      cartdispatch({
        type:'CLEAR_CART'
        
      })
    }

    let handleCuponDiscount=async()=>{
       
         let {data}=await axios.get(`http://localhost:8000/cupon/${cuponcode}`)
         setDiscountcupon(data[0].discount)
        
    }

    let payment=async(token)=>{
        let {data}=await axios.post('http://localhost:8000/payment',{
          amount:order_discount_total*100,
          token:token
        }) 
        console.log(data)
    }
  
    
  return (
   <div className='cartpage'>
     <div className='container'>
       <h2>Cart Page</h2>

       <Grid fluid>
    <Row className="show-grid">
      <Col  lg={16} sm={24}  md={24} style={{marginBottom:"30px"}}>
      <Grid fluid>
        <Row className="show-grid">
            <Col xs={10}  className='cartpage_item'><h5>Item</h5></Col>
            <Col xs={2}><h5 >Price</h5></Col>
            <Col xs={3}><h5>Quantity</h5></Col>
            <Col xs={3}></Col>
            <Col xs={3}><h5>Subtotal</h5></Col>
            <Col xs={3}></Col>
             
            
         </Row>
         {cart.cartItems.map((item)=>(
           <Row className="show-grid">
          <>
          <Col xs={10} style={{marginBottom:"16px"}}>
            <div className='cartpage_item'>
            <img src={item.image} style={{width:"100px"}} />
            <div className='cartpage_item_text'>
              <p style={{fontWeight:'100',fontSize:"13px"}}>{item.brandname}</p>
              <h3 dangerouslySetInnerHTML={{__html: `${item.description}`}}></h3>
              <p><span style={{fontWeight:'500',fontFamily:'Hind',color:' #252525'}}>Color:</span><span style={{display:"inline-block",borderRadius:"50%",  width: "10px",marginLeft:"10px", height: "10px", background:`#${item.color}`}}></span></p>
              <span><span style={{fontWeight:'500',fontFamily:'Hind',color:' #252525'}}>Size:</span><span style={{display:"inline-block",marginLeft:"10px"}}>{item.size}</span></span>
            </div>
            </div>
          </Col>
          <Col xs={2}>
            <div className='cartpage_price'>
            <h5 >${item.price}</h5>
            </div>
            </Col>
          <Col xs={3}>
          <div className='cartpage_quantity'>
            <div className='cartpage_quantity_text'>
              <span style={{cursor:"pointer"}} onClick={()=>handleSubQuantity(item)}>-</span>
              <span  className='cartpage_quantity_count'> {item.quantity}</span>
             
              <span  style={{cursor:"pointer"}} onClick={()=>handleAddQuantity(item)}>+</span>
              </div>
            </div>
            </Col>
          <Col xs={3}></Col>
          <Col xs={3}>
          <div className='cartpage_price2'>
            <h5 >${item.price2}</h5>
            </div>
            </Col>
          <Col xs={3}>
          <p style={{textAlign:"center",marginTop:"50px"}} onClick={()=>handleRemoveCart(item)}><i style={{color:"#B1B1B1",  cursor:"pointer",fontSize:"18px"}} class="fa-sharp fa-solid fa-xmark"></i></p>
          </Col>
         
          </>
          </Row>
         ))}

<Row className="show-grid">
            <Col xs={9}></Col>
            <Col xs={2}></Col>
            <Col xs={3}></Col>
            <Col xs={3} onClick={handleCartClear}><h5 className='cartpage_clear'>Clear Cart</h5></Col>
            <Col xs={3}></Col>
            <Col xs={4}>
              <h5 className='cartpage_update'>Update cart</h5>
              </Col>
             
            
         </Row>

         <Row className="show-grid">
           <h4 className='cupon_discount'>Coupon Discount</h4>
            <Col xs={14}>
              
            <Input placeholder="Enter your code here"  onChange={(e)=>setCuponcode(e)}/>
            <Button color="red" appearance="primary" style={{position:"absolute",top:"0",right:"0",width:"110px",background:"#FC9D9D",borderRadius:"50px"}} onClick={handleCuponDiscount}>
        Submit
      </Button>
            </Col>
            
           
             
            
         </Row>
  </Grid>
      </Col>
      <Col lg={8} sm={24}  md={24}>
        <div className='shipping'>
        <h3>Shipping</h3>
        <Input placeholder="Zip Code" onChange={(e)=>{setZipcode(e)}}/>

        <Input placeholder="Address" />

        <Input placeholder="Phone Number" />

        <div className='shipping_box'>
           <div className='shipping_subtotal'>
              <h5>Subtotal</h5>
              <h5>{Total_price}</h5>
           </div>
           <div className='shipping_delivary'>
              <h5>Shipping</h5>
              <h5>{cost}</h5>
           </div>
           
           <div className='shipping_Order'>
              <h5>Order Total</h5>
              <h5>{order_discount_total}</h5>
              {/* <h5>{order_total}</h5> */}
           </div>
      
      
        </div>

        {zipecode?
        <>
           <StripeCheckout
       
       stripeKey="pk_test_51LpW5UFmZxDeG6doC2618K4oTRMvLdRRxCWSQgjEkGguWg0syHpbDubzoewAB5JSTlzffKkEZvcRbqVeX6dCiipe00NqkzWSeG"
       description="Big Data Stuff"
      amount={order_discount_total*100}
       currency="BDT"
        name ='Trali Ecommerce'
        token={payment}
       
      >
        <h4 className="btn" >Procesed to Checkout</h4>
      </StripeCheckout>
        
        </>

        :
        <>
        <h4 className="btn" onClick={()=>{toast.info('Please Enter Your Area ZipCode!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
  
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });}}>
                Procesed to Checkout
                </h4>
                <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                theme="dark"
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </>
         }

       

        </div>
     
      </Col>
     
    </Row>
  </Grid>
    </div>
   </div>
  )
}


export default Cart
