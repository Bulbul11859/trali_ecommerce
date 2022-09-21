import React, { useContext } from 'react'
import { Store } from '../Store'
import { Grid, Row, Col } from 'rsuite';




const Cart = () => {
    let {cartstate,cartdispatch}=useContext(Store)
    const {cart}=cartstate
    
  return (
   <div className='cartpage'>
     <div className='container'>
       <h2>Cart Page</h2>

       <Grid fluid>
    <Row className="show-grid">
      <Col xs={16}>
      <Col xs={8} className='cartpage_item'><h5>Item</h5></Col>
      <Col xs={3}><h5>Price</h5></Col>
      <Col xs={3}><h5>Quantity</h5></Col>
      <Col xs={3}>.</Col>
      <Col xs={3}><h5>Subtotal</h5></Col>
      <Col xs={4}></Col>
         </Col>
      <Col xs={8}>Shipping</Col>
     
    </Row>
  </Grid>
    </div>
   </div>
  )
}

export default Cart
