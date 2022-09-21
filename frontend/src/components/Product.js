import React, { useContext, useState } from 'react'
import { Container,Grid, Row, Col,Button,Panel,Rate } from 'rsuite';
import { ToastContainer, toast } from 'react-toastify';

import { Store } from '../Store';

const Product = (props) => {
  

//cart
  const {cartstate,cartdispatch}=useContext(Store)
   const[activecolor,setActiveColor]=useState('')
   const[activeproductsize,setProductSize]=useState('')

   
   const {cart}=cartstate
   
  console.log(activeproductsize)
  
 

   const handleAddCart=(product)=>{

    if(activecolor && activeproductsize){
    console.log(product)
   
   
    const product_id=product._id.toString();


    const existingItem=cart.cartItems.find((item,index)=>item._id===product_id)
 
    const quantity=existingItem?existingItem.quantity+1:1
    const price= existingItem?existingItem.price*2:product.price 
   
    
    cartdispatch({
      type:'ADD_TO_CART',
      payload:{...product,quantity,price,color:activecolor,size:activeproductsize}
    })

    toast.success('Succesfully added your product', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      setActiveColor('')
      setProductSize('')
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
  return (
    <div>
         <Panel  bodyFill style={{ display: 'inline-block', width:"95%" }}>
    <img src={props.img} style={{  width:"100%" }} />
   <div className='product'  style={{  width:"100%" }} >
     <Rate style={{width:"75%"}} className='rating' size="xs" readOnly defaultValue={props.rating} allowHalf /> <span style={{width:"10%"}} className='font_zara'>{props.brandName}</span>
     <h5 className='product_head'>{props.heading}</h5>
     <h5 className='product_head2' dangerouslySetInnerHTML={{__html: props.description}}></h5>
     <div className='colorSizeBox'>
       <div>
     {props.color.map(item=>(
       <span className={activecolor==item?'product_color active_product_color': 'product_color'} style={{background:`#${item}`}} onClick={()=>setActiveColor(item)}></span>
     ))}
     </div>
     <div className='colorSizeBox_Size'>
       {props.Size.map(item=>(
        
         <span style={{cursor:"pointer"}} className={activeproductsize==item?"product_size_bb":""} onClick={()=>setProductSize(item)}>{item} </span>
        
       ))}
     </div>
     </div>

     {/* cart  */}

     <p className='span_bag_icon' onClick={()=>handleAddCart(props.product)}>
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
     <span className='product_dolar'>৳{props.price}</span>
     </span>
     </div>

    
  </Panel>
     
  
    </div>
  )
}

export default Product