import React, { useEffect, useState } from 'react'
import {  Carousel,Container,Button} from 'rsuite';
import axios from 'axios';
const Banner = () => {
 let[banner,setImg]=useState([])

  useEffect(()=>{
  async function banner(){
    let data= await axios.get("http://localhost:8000/banner")
    
      setImg(data.data)
   }
   banner() 
  },[])

  return (
    <>
    
    <Carousel className="custom-slider">
      {banner.map((item,index)=>(
      
       <div className='sliderItem'key={index} >
            <div className='bannerimg' style={{backgroundImage:`url(${item.img})`}}>
            <Container className='container'>
               <h3 >{item.subheading}</h3>
               <h1>{item.heading}<span>30%</span></h1>
               <button >{item.button}</button>
              
               </Container>
            </div>

         </div>
        
      ))}
  </Carousel>
 
  </>
  )
}

export default Banner