import React from 'react';
import { Grid, Row, Col,Input, InputGroup, MaskedInput,Button } from 'rsuite';



const Footer = () => {
  return (
    <div className='Footer' style={{marginTop:"100px"}}>
      <div className='Footer_Body'>
          <div className='Footer_Body_top'>
          <Grid fluid>
            
            <Row className="show-grid">
              <div style={{position:"relative"}}>
                <Col xs={4} className="Footer_Body_top_pic" style={{ backgroundImage: `url("./assests/images/footer1.png")` }}></Col>
                <Col xs={4} className="Footer_Body_top_pic" style={{ backgroundImage: `url("./assests/images/footer2.png")` }}></Col>
                <Col xs={4} className="Footer_Body_top_pic" style={{ backgroundImage: `url("./assests/images/footer3.png")` }}></Col>
                <Col xs={4} className="Footer_Body_top_pic" style={{ backgroundImage: `url("./assests/images/footer4.png")` }}></Col>
                <Col xs={4} className="Footer_Body_top_pic" style={{ backgroundImage: `url("./assests/images/footer5.png")` }}></Col>
                <Col xs={4} className="Footer_Body_top_pic" style={{ backgroundImage: `url("./assests/images/footer6.png")` }}></Col>
               <p className='Footer_Body_top_bottom'>
                  <div style={{display:"flex",alignItems:"center",flexDirection: "column",marginTop:'10px'}}>
                  <h6 className='bottom_tx1'>go to</h6>
                <h5 className='bottom_tx2'>Trali</h5>
                  </div>
               </p>
              </div>
            </Row>
        </Grid>
        <div style={{background:"#05297F",paddingBottom:"100px"}}>
            <div className='container'>
               <div style={{paddingTop:"80px"}}>
               <Grid fluid>
   
                <Row className="show-grid">
                <Col lg={6} md={8}  sm={24}>
                <div  className='login_trali' style={{ textDecoration: 'none' }}>
                <i className="fa-solid fa-cart-flatbed-suitcase"></i>
                 Trali
                </div>
                <p className='login_trali_text'>
                 Nunc gravida mi neque, id fringilla velit efficitur vel. Sed mollis, arcu ac mollis eleifend, nunc
                 </p>
                </Col>
                <Col  lg={6} md={8}  sm={24}>
                  <div className='footer_top'>
                      <p className='footer_top_text'>Generals</p>
                      <span>Customer support</span>
                      <span>Payments</span>
                      <span>API Supports</span>
                      <span>Privacy Policy</span>
                     
                    </div>
                </Col>
                <Col  lg={6} md={8}  sm={24}>
                <div className='footer_top'>
                      <p className='footer_top_text'>Supports</p>
                      <span>Terms & Conditions</span>
                      <span>Products Return</span>
                      <span>Wholesale Policy</span>
                      <span>Address Store</span>

                    </div>
                </Col>
                <Col  lg={6} md={8}  sm={24}>
                <div className='footer_top'>
                      <p className='footer_top_text'>Subscribe Us</p>
                      <div style={{marginTop:"25px"}}>
                      <Input placeholder="Subscribe" style={{borderRadius:"50px"}}/>
                      <Button color="red" appearance="primary" className='subscribe_input'>
                        Submit
                      </Button>
                      </div>
                       
                    
                    </div>
                </Col>
                </Row>

               </Grid>
               </div>

               <div style={{border: "1px solid #666666",marginTop:"80px"}}></div>
               
               <div style={{paddingTop:"80px"}}>
               <Grid fluid>
   
                <Row className="show-grid">
                <Col lg={6} md={8}  sm={24}>
                <div className='footer_top'>
                      <p className='footer_top_text'>Contact Information</p>
                      <span>Customer support</span>
                      <span>Payments</span>
                      <span>API Supports</span>
                      <span>Privacy Policy</span>
                     
                    </div>
                </Col>
                <Col  lg={6} md={8}  sm={24}>
                  <div className='footer_top'>
                      <p className='footer_top_text'>Get In Touch</p>
                      <span>Customer support</span>
                      <span>Payments</span>
                      <span>API Supports</span>
                      <span>Privacy Policy</span>
                     
                    </div>
                </Col>
                <Col  lg={6} md={8}  sm={24}>
                <div className='footer_top'>
                      <p className='footer_top_text'>Categories</p>
                      <span>Terms & Conditions</span>
                      <span>Products Return</span>
                      <span>Wholesale Policy</span>
                      <span>Address Store</span>

                    </div>
                </Col>
                <Col  lg={6} md={8}  sm={24}>
                <div className='footer_top'>
                      <p className='footer_top_text'>Popular Products</p>
                     
                       
                    
                    </div>
                </Col>
                </Row>

               </Grid>
               </div>
            </div>
        </div>
          </div>
      </div>
    </div>
  )
}

export default Footer
