import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container,Grid, Row, Col,Button} from 'rsuite';
import Product from './Product';


const Topproducts = () => {
    let[product,setProduct]=useState([])
    
    useEffect(()=>{
       async function fetchproduct(){
           let {data}=await axios.get("http://localhost:8000/product")
           setProduct(data)
       }
       fetchproduct()
    },[])
    
  return (
      <>
    <Grid fluid>
    <Container className='container topProduct'>
    <Row className="show-grid">
      <Col xs={12}>
          <h2>Top Products</h2>
      </Col>
      <Col xs={12}>
          <ul>
              <li><span></span>All</li>
              <li><span></span>Boys Collection</li>
              <li><span></span>Girl Collection</li>
              <li><span></span>Shose Collection</li>
          </ul>
      </Col>
    </Row>
    </Container>
    </Grid>
    
    <Grid fluid>
    <Container className='container ka'>
    <Row className="show-grid">
     {product.map(item=>(
          <Col xs={24} sm={12} md={8} lg={6}  style={{marginBottom:"35px"}}>
          <Product product={item} img={item.image} heading={item.name}  color={item.productcolor} Size={item.productsize} brandName={item.brandname} description={item.description} price={item.price}/>
          </Col>
     ))}
      
    </Row>
    </Container>
        </Grid>
        </>
  )
}

export default Topproducts