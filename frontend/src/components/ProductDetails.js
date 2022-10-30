import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import { Grid, Row, Col,Rate } from 'rsuite';
import { Store } from '../Store';
import { Link } from 'react-router-dom';
import { useNavigate   } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const ProductDetails = () => {

  let {state,cartstate,cartdispatch}=useContext(Store)

  

    const {cart}=cartstate
    

  const navigate = useNavigate();
 

  const[color,setColor]=useState('')
  const[productsize,setSize]=useState('')

  const[activecolor,setActiveColor]=useState('')
  const[activeproductsize,setActiveProductSize]=useState('')

  
   const[productItem,setProduct]=useState([])

   const [relatedproduct,setRelatedProduct]=useState([])

   
    
console.log("BB",color)
console.log("BB",productsize)

    
   

     

   
  
  let { id } = useParams();
  
  

    
    useEffect(()=>{
       async function productDetails(){
        let {data}=await axios.get(`http://localhost:8000/productdetails/${id}`)
        let rdata=await axios.get(`http://localhost:8000/relatedProduct/${data.name}`)
        
        setProduct(data)
        setColor(data.productcolor)
        setSize(data.productsize)
        console.log(data)
        
        setRelatedProduct(rdata.data)
        
        }
        productDetails()
    },[])

    const newRelatedProduct=relatedproduct.filter(item=> item._id != id)
    
     console.log(newRelatedProduct)
  
       
   

  let newBB=cart.cartItems.filter((item)=>item._id==productItem._id)

  let newBB2=newBB.reduce(function(result, item) {
    let key = Object.keys(item)[0]; //first property: a, b, c
    result[key] = item[key];
    return result;
  }, {});
  
  const isEmpty = Object.keys(newBB2).length === 0;
  console.log(isEmpty)

   
   

    let handleAddQuantity=(product)=>{
     
     
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


    const handleAddCart=(product)=>{
      console.log(product)
      console.log(state)
      if(state.userInfo){
      if(activecolor && activeproductsize){
      
     
     
      const product_id=product._id.toString();
  
  
      const existingItem=cart.cartItems.find((item,index)=>item._id===product_id)
   
      const quantity=existingItem?existingItem.quantity+1:1
      const price2= existingItem?product.price*quantity:product.price 
     
      
      cartdispatch({
        type:'ADD_TO_CART',
        payload:{...product,quantity,price2,color:activecolor,size:activeproductsize}
      })
  
      toast.success('Succesfully added your product', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setActiveColor('')
        setActiveProductSize('')
    }
  
  
    else if(!activecolor && !activeproductsize){
      toast.warn('please added one size & color ', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  
    else if(!activeproductsize){
      toast.warn('please added one size', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  
  
    else{
      toast.warn('please added one color ', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
      }
      else{
        toast.info('please login first', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
  
     }

    let Add_To_Cart=(product)=>{
      
      let bb=cart.cartItems.filter((item)=>item._id==product._id)
      
     
     let bb2=bb.reduce(function(result, item) {
      let key = Object.keys(item)[0]; //first property: a, b, c
      result[key] = item[key];
      return result;
    }, {});

   
      
     if(bb2._id==product._id){
      console.log("jhefrrr")

      navigate("/cart");
     }
     else{
     
      if(state.userInfo){
      if(activecolor && activeproductsize){
      
     
     
      const product_id=product._id.toString();
  
  
      const existingItem=cart.cartItems.find((item,index)=>item._id===product_id)
   
      const quantity=existingItem?existingItem.quantity+1:1
      const price2= existingItem?product.price*quantity:product.price 
     
      
      cartdispatch({
        type:'ADD_TO_CART',
        payload:{...product,quantity,price2,color:activecolor,size:activeproductsize}
      })
  
      toast.success('Succesfully added your product', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setActiveColor('')
         setActiveProductSize('')
    }
  
  
    else if(!activecolor && !activeproductsize){
      toast.warn('please added one size & color ', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  
    else if(!activeproductsize){
      toast.warn('please added one size', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  
  
    else{
      toast.warn('please added one color ', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
      }
      else{
        toast.info('please login first', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
  
     }

      
        
     
     
    }
    
  return (
    <div className='productDetails'>
      <div className='container'>
      <Grid fluid>
          
          <Row className="show-grid">
            <Col xs={12}>
             
             <img src={`../${productItem.image}`} style={{maxWidth:"100%",height: "750px"}}/>
             
            </Col>
            <Col xs={12}>
              <h1 dangerouslySetInnerHTML={{__html:` ${productItem.description}`}}></h1>
              <div style={{display:"flex",justifyContent:'space-between',alignItems:"center",marginTop:"35px"}}>
              <h4 className='productDetails_price'>${productItem.price}
              <del className='productDetails_old_price'>${productItem.price}</del>
              <h4 className='productDetails_stock'><span></span>in stock</h4>
              </h4>
             
              <h4 className='productDetails_left'>only 5 left</h4>
              </div>
             
             <div style={{marginTop:"50px"}}>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
             </div>

             
             <div className='productDetails_color'>
              <h6>Select Color:</h6>
            <div className='productDetails_color_bg'>
            <span className={activecolor==color[0]?' productDetails_color_active':''} onClick={()=>setActiveColor(color[0])} style={{background:`#${color[0]}`}}></span>
             <span className={activecolor==color[1]?' productDetails_color_active':''} onClick={()=>setActiveColor(color[1])} style={{background:`#${color[1]}`}}></span>
             <span className={activecolor==color[2]?' productDetails_color_active':''} onClick={()=>setActiveColor(color[2])} style={{background:`#${color[2]}`}}></span>
             <span className={activecolor==color[3]?' productDetails_color_active':''} onClick={()=>setActiveColor(color[3])} style={{background:`#${color[3]}`}}></span>
             <span className={activecolor==color[4]?' productDetails_color_active':''} onClick={()=>setActiveColor(color[4])} style={{background:`#${color[4]}`}}></span>
            </div>
            <h6 style={{marginLeft:"60px"}}>Select Size:</h6>
            <div className='productDetails_size_bg'>
            <span className={activeproductsize==productsize[0]?"product_size_bb":""} onClick={()=>setActiveProductSize(productsize[0])}>{productsize[0]}</span>
             <span className={activeproductsize==productsize[1]?"product_size_bb":""} onClick={()=>setActiveProductSize(productsize[1])}>{productsize[1]}</span>
             <span className={activeproductsize==productsize[2]?"product_size_bb":""} onClick={()=>setActiveProductSize(productsize[2])}>{productsize[2]}</span>
             <span className={activeproductsize==productsize[3]?"product_size_bb":""} onClick={()=>setActiveProductSize(productsize[3])}>{productsize[3]}</span>
             <span className={activeproductsize==productsize[4]?"product_size_bb":""} onClick={()=>setActiveProductSize(productsize[4])}>{productsize[4]}</span>
            </div>
             </div>
              <Row className="show-grid" style={{marginTop:'55px'}}>
                
                  <Col xs={16}>
                    <div>
                 
                  {cart.cartItems.map((item)=>(
                    item._id ==id &&

                      <>
                       <div className='cartpage_quantity' style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                          <div className='cartpage_quantity_text' style={{display:"flex",border:"1px solid #000",borderRadius:"50px",width:"70px",height:"32px",justifyContent:"space-around",alignItems:"center"}}>
                          <span style={{cursor:"pointer"}} onClick={()=>handleSubQuantity(item)}>-</span>
                         
                          <span  className='cartpage_quantity_count'>{item.quantity} </span>
                        
                      <span  style={{cursor:"pointer"}} onClick={()=>handleAddQuantity(item)}>+</span>
                    </div>
    
                     <div>
                      <p style={{fontFamily:'Hind',fontStyle:'normal',fontSize:'22px',fontWeight:'600',color: '#252525'}}>৳ {item.price2}</p>
                     </div>
                    </div>
                    </>
                      ))}

                     <div style={{position: 'absolute',top:'0',left: '108px'}}>
                      <p style={{fontFamily:'Hind',fontStyle:'normal',fontSize:'16px',fontWeight:'600',color: '#FFFFFF',background:"#FC9D9D",borderRadius:"50px",padding:"0px 10px",width:"180px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={()=>Add_To_Cart(productItem)}>
                       {isEmpty?
                         <>   <i class="fa-solid fa-bag-shopping" style={{paddingRight:"10px"}}></i>Add To Cart
                       
                         </>
                       :
                    
                         <><i class="fa-solid fa-bag-shopping" style={{paddingRight:"10px"}}></i> Go To Cart Page</>

                       }
                     
                        </p>
                      <ToastContainer
                      position="top-center"
                      autoClose={2000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
                     </div>
                    
            
            </div>
                   <h1></h1>
                  </Col>
                  <Col xs={8} xsPush={4}>
                    <div style={{fontSize:"22px",color:"#05297F"}}>
                    <i class="fa-regular fa-heart" style={{marginRight:"20px", margiRight: "20px",border: "1px solid #05297F", padding:" 4px",borderRadius: "50%"}}></i> 
                    <i class="fa-solid fa-scale-balanced" style={{border: "1px solid #05297F", padding:" 4px",borderRadius: "50%"}}></i>
                    </div>
                    
                  </Col>
            </Row>
            </Col>
            
          </Row>

          <div className='RelatedProduct'>
            <h1 className='RelatedProduct_tittle'>Related Product</h1>
          <Row className="show-grid">
          {newRelatedProduct.map((item)=>(
            
           
            <Col xs={24} sm={12} md={8} lg={8}>{item.brandname}
             <div className='RelatedProduct_img'  style={{backgroundImage:`url(../${item.image})`}}></div>
             <div className='product'  style={{  width:"100%" }} >
           <Rate style={{width:"75%"}} className='rating' size="xs" readOnly defaultValue={2.5} allowHalf /> <span style={{width:"10%"}} className='font_zara'>{item.brandname}</span>
           <h5 className='product_head'>{item.name}</h5>
           <h5 className='product_head2' dangerouslySetInnerHTML={{__html: item.description}}></h5>
           <div className='colorSizeBox'>
       <div>
     {item.productcolor.map(item=>(
       <span className={activecolor==item?'product_color active_product_color': 'product_color'} style={{background:`#${item}`}} onClick={()=>setActiveColor(item)}></span>
     ))}
     </div>
     <div className='colorSizeBox_Size' style={{marginRight:"40px"}}>
       {item.productsize.map(item=>(
        
         <span style={{cursor:"pointer"}} className={activeproductsize==item?"product_size_bb":""} onClick={()=>setActiveProductSize(item)}>{item} </span>
        
       ))}
     </div>
     </div>

     <p className='span_bag_icon' onClick={()=>handleAddCart(item)}>
     <i class="fa-solid fa-bag-shopping bag_icon"></i>
     <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
     </p>

     <span className='product_dolar_parent'>
     <span className='product_dolar'>৳{item.price}</span>
     </span>
     </div>

            </Col>
          
          
          ))}
          </Row>
      
        </div>

        </Grid>

        
      </div>
      
    </div>
  )
}

export default ProductDetails
