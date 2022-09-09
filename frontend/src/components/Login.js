import axios from 'axios';
import React, { useState,useContext } from 'react'
import { Container,Form,ButtonToolbar,Button,Textarea,Message,useToaster  } from 'rsuite';
 import { Store } from '../Store';
 import { Link } from "react-router-dom";
 import { useNavigate } from "react-router-dom";


const Login = () => {
  let navigate = useNavigate();

   let{state,dispatch}=useContext(Store)

    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const [error11,setError]=useState("")
   

    let handleSubmit=async()=>{
       let {data}=await axios.post("http://localhost:8000/login",{
          
            email:email,
            password:password,
           
        })
        setError(data.msgError)
        console.log(data)
        dispatch({type:'USER_LOGIN',payload:data.data})
        localStorage.setItem('userInfo',JSON.stringify(data.data))
        console.log(state)
        navigate("/");
    }

  return (
    <Container className='container'>

    <div className='reg'>
    <Form>
       
        <Form.Group controlId="email">
        <Form.ControlLabel>Email</Form.ControlLabel>
        <Form.Control name="email" type="email" onChange={(e)=>setEmail(e)} />
        </Form.Group>
        <Form.Group controlId="password">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control name="password" type="password" autoComplete="off" onChange={(e)=>setPassword(e)} />
        </Form.Group>
         {error11?
          <Message type="error">{error11}</Message>
         :
           ""
         }
       
    
        <Form.Group>
        <ButtonToolbar>
            <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
            <Button appearance="default">Cancel</Button>
        </ButtonToolbar>
        </Form.Group>

        <Form.HelpText> Have Not An Account?<Link to="/registration">Sign Up</Link>   </Form.HelpText>
     </Form>
    </div>
   
    </Container>
  )
}

export default Login