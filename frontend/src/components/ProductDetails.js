import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import { Grid, Row, Col } from 'rsuite';


const ProductDetails = () => {
  
   const[product,setProduct]=useState({})
  
  let { id } = useParams();
    
    useEffect(()=>{
       async function productDetails(){
        let {data}=await axios.get(`http://localhost:8000/productdetails/${id}`)
        setProduct(data)
        }
        productDetails()
    },[])

    console.log(product)
  return (
    <div className='productDetails'>
      <div className='container'>
      <Grid fluid>
          
          <Row className="show-grid">
            <Col xs={12}>
              <h1>{product.name}</h1>
             <img src={product.image} />
            </Col>
            <Col xs={12}>
              <h1 dangerouslySetInnerHTML={{__html:` ${product.description}`}}></h1>
              <div style={{display:"flex",justifyContent:'space-between',alignItems:"center"}}>
              <h4 className='productDetails_price'>${product.price}
              <h4 className='productDetails_stock'><span></span>in stock</h4>
              </h4>
             
              <h4 className='productDetails_left'>only 5 left</h4>
              </div>
              
             
            </Col>
          </Row>
        </Grid>
      </div>
      
    </div>
  )
}

export default ProductDetails
