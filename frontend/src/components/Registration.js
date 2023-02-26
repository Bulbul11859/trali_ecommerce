import axios from 'axios';
import React, { useState } from 'react'
import { Container,Form,ButtonToolbar,Button,Textarea } from 'rsuite';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Registration = () => {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[confirmpassword,setConfirmPassword]=useState("")
    let navigate = useNavigate();

     
    let handleSubmit=()=>{
        console.log("chap dese")
        axios.post("http://localhost:8000/registration",{
            name:name,
            email:email,
            password:password,
            confirmpassword:confirmpassword
        })
        navigate("/login");

    }




  return (
    <Container className='container'>

        <div className='reg'>
        <Form fluid style={{color:"#000",fontSize:'16px'}}>
            <Form.Group controlId="name">
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Form.Control name="name" onChange={(e)=>setName(e)}/>
            </Form.Group>
            <Form.Group controlId="email">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" type="email" onChange={(e)=>setEmail(e)} />
           
            </Form.Group>
            <Form.Group controlId="password">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control name="password" type="password" autoComplete="off" onChange={(e)=>setPassword(e)} />
            </Form.Group>

            <Form.Group controlId="password2">
            <Form.ControlLabel>Confirm Password</Form.ControlLabel>
            <Form.Control name="password" type="password" autoComplete="off"  onChange={(e)=>setConfirmPassword(e)}/>
            </Form.Group>
        
            <Form.Group>
            <ButtonToolbar>
                <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
                <Button appearance="default">Cancel</Button>
            </ButtonToolbar>
            </Form.Group>
            <Form.HelpText style={{marginBottom:"50px"}}>Already Have An Account?<Link to="/login">Login</Link> </Form.HelpText>
         </Form>
        </div>

        </Container>
  )
}

export default Registration