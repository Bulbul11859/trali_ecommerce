import React, { useEffect, useState }  from 'react'
import { Container,Grid, Row, Col,Button} from 'rsuite';
import axios from 'axios';

const Deal = () => {
    let[deal,setDeal]=useState([])

    useEffect(()=>{
        async function deal(){
           let data=await axios.get("http://localhost:8000/deal")
            
                setDeal(data.data)
          
        }
       deal()
   },[])

   

   

  return (
    <Grid fluid className='deal'>
    <Container className='container'>
        
           <Row className="show-grid">
               {deal.map((item,index)=>(
                  
                    <Col  xs={12}>
                        <div className='dealBox' id={`bb_${index}`} style={{backgroundImage:`url(${item.img})`}}>
                            <div className='dealBox_text'>
                            <h5 className={item.classname}>{item.subheading}</h5>
                            <h2>{item.heading}</h2>
                            <button className={`deal_button_${index}`}>{item.button}</button>
                            </div>
                        </div>
                    </Col>
               ))}
             
           </Row>
        
       </Container>
       </Grid>
  )
}

export default Deal