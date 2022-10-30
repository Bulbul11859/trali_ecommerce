import React, { useEffect, useState,useRef, useMemo, useContext } from 'react'
import { Container,Grid, Row, Col,Form,Input,ButtonToolbar,Button,InputPicker,Sidenav, Nav, Dropdown,Toggle,Checkbox, CheckboxGroup,Table } from 'rsuite';
import JoditEditor from "jodit-react";
import {Store} from '../Store'
import { Icon } from 'rsuite'
import { Link } from "react-router-dom";
import axios from 'axios';

import { useNavigate} from "react-router-dom";


const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
const { Column, HeaderCell, Cell } = Table;


const Dashboard = () => {
  let {state}=useContext(Store)

 
 
  

    //checkbox
    const check_box = ['Sm', 'M','L', 'XL', 'XXL'];
    const [value, setValue] = React.useState([]);

  const handleCheckAll = (value, checked) => setValue(checked ? check_box : []);

  let sizeArr=[]
  const handleChange = value =>
   {
    value.map(item=>{
      if(item==''){
       
      }
      else{
        sizeArr.push(item)
      }
    })
    setValue(sizeArr) ;
   
  };
  console.log(value)


  


  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState('1');
  const [pro,setPro]=useState(true)

  //product
   let[productname,setProductname]=useState('')
   let[productPrice,setProductPrice]=useState('')
   let[productImage,setProductImage]=useState('')
   let[productColor,setProductColor]=useState([])


   let handleProductColor=(e)=>{
      console.log(e.split('').includes('#'))
      if(e.split('').includes('#')){
        console.log("not allow")
      }
      else{
      
        setProductColor(e.split(','))
        console.log(e.split(','))
      }
      
  }
   

  //product Brand
  let [brandnameselect,setBrandnameselect]=useState('')
  let[brandnameid,setBrandnameid]=useState('')
  let found;

  //product catagory
  let [catagorynameselect,setCatagorynameselect]=useState('')
  let[catagorynameid,setCatagorynameid]=useState('')
  let found2;

  //brand component
  const [brand,setBrand]=useState(false)
   let [productbrand,setProductbrand]=useState("")
   const [brandname,setBrandname]=useState([])


  //catagory
   const [catagory,setCatagory]=useState(false)
   let [productcatagory,setProductcatagory]=useState("")
   const [catagoryname,setCatagoryname]=useState([])

   //cupon
   const [cupon,setCupon]=useState(false)
   let [cuponName,setCuponName]=useState("")
   let [discount,setDiscount]=useState("")
   let [cupondata,setCupondata]=useState([])

   
  
//editor
   const editor = useRef(null)
   const [content, setContent] = useState('')
   

   //upload
   let handleUpload=()=>{
    setCatagory(false)
    setBrand(false)
    setPro(true)
    setCupon(false)
   }
//brand
  let handlebrand=()=>{
    setPro(false)
    setCatagory(false)
    setBrand(true)
    setCupon(false)
  }
//catagory
  let handleCatagory=()=>{
    setPro(false)
    setBrand(false)
    setCatagory(true)
    setCupon(false)
  }

  //cupon 
  let handleCupon=()=>{
    setPro(false)
    setBrand(false)
    setCatagory(false)
    setCupon(true)
  }

//brand
  let handleBrandSubmit=async ()=>{
    let dd=await axios.post('http://localhost:8000/brand',{
      brand:productbrand
    })
     console.log(dd.data)
  }

  useEffect(()=>{
   async function brand() {
      let {data}=await axios.get('http://localhost:8000/brand')
      setBrandname(data)
    }
    brand()
  },[])

  //catagory
  let handleCatagorySubmit=async()=>{
   
        let {data}=await axios.post("http://localhost:8000/catagory",{
          catagory:productcatagory
        })
       
  }

  useEffect(()=>{
     async function catagory(){
      let{data}=await axios.get('http://localhost:8000/catagory')
      setCatagoryname(data)
     }
     catagory()
  },[])

  //product 
  let handleProductsubmit=async()=>{
    console.log("sahkshasd")
    const {data}=await axios.post('http://localhost:8000/product',{
      name:productname,
      description:content,
      price:productPrice,
      image:productImage,
      brand:brandnameid,
      brandname:brandnameselect,
      catagory:catagorynameid,
      catagoryname:catagorynameselect,
      productsize:value,
      productcolor:productColor,
      owner:state.userInfo._id
    })
  }

  let handlecuponData=async()=>{
     const {data}=await axios.post('http://localhost:8000/cupon',{
      cuponname:cuponName,
      discount:discount
     })
  }
  
  useEffect(()=>{
    async function cuponli(){
       let {data}=await axios.get('http://localhost:8000/cuponlist')
       setCupondata(data)
    }
    cuponli()
  },[])
  
 let handleDeleteCupon=async(id)=>{
       alert(id)
       const {data}=await axios.post(`http://localhost:8000/cuponlist/${id}`,{
         
     })
 }
  

 let handleEditCupon=()=>{

 }
 
 
  

  const data2=brandname.map(item => ({ label: item.brand, value: item._id}));
  const data1=catagoryname.map(item => ({ label: item.catagory, value: item._id}));
  console.log(catagorynameselect)
  console.log(catagorynameid)
  
  return (
    

    <div>
       <Row className="show-grid" style={{margin:"0px"}}>
        <h1 dangerouslySetInnerHTML={{__html: content}}></h1>
       <Col xs={6}>
        
       <div style={{ width: 240 }}>
    <Toggle
   onChange={setExpanded}
   checked={expanded}
   checkedChildren="Product Dashboard"
   unCheckedChildren="Product Dashboard"
 />
 <hr />
 <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
   <Sidenav.Body>
     <Nav activeKey={activeKey} onSelect={setActiveKey} >
       <Nav.Item eventKey="1"  onClick={handleUpload}>
       <i class="fa-solid fa-users" ></i> Product Upload
       </Nav.Item>
       <Nav.Item eventKey="2"  onClick={handlebrand}>
       <i class="fa-solid fa-users"></i> Brand Upload
       </Nav.Item>
       <Nav.Item eventKey="3" icon={<i class="fa-solid fa-users"></i>} onClick={handleCatagory}>
         Catagory Upload
       </Nav.Item>


        <Nav.Item eventKey="4"  onClick={handleCupon}>
       <i class="fa-solid fa-users"></i> Cupon
       </Nav.Item>
     
     </Nav>

   </Sidenav.Body>
   <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
 </Sidenav>
</div>
      </Col>
      <Col xs={16}>
      
          {pro&&
          <Form fluid>
          
          <Form.Group controlId="name-1">
           <Form.ControlLabel>Product Name</Form.ControlLabel>
           <Form.Control onChange={(e)=>setProductname(e)} name="name"  placeholder='Product Name'/>
          </Form.Group>
          
          <Form.Group controlId="name-1">
           <Form.ControlLabel>Product Description</Form.ControlLabel>
           <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => {}}
            />
          </Form.Group>
          
          <Form.Group controlId="name-1">
           <Form.ControlLabel>Product Price</Form.ControlLabel>
           <Form.Control onChange={(e)=>setProductPrice(e)} name="name"  placeholder='Product Price'/>
          </Form.Group>

          <Form.Group controlId="name-1">
           <Form.ControlLabel>Product Image</Form.ControlLabel>
           <Form.Control onChange={(e)=>setProductImage(e)} name="name"  placeholder='Product Image'/>
          </Form.Group>
 
       
          <Form.Group controlId="name-1">
           <Form.ControlLabel>Product Brand</Form.ControlLabel>
           <InputPicker data={data2} block   placeholder='Product Brand'  onChange={(e)=>{setBrandnameid(e);   found=data2.find(({value})=>value==e);  setBrandnameselect(found.label)}}/>
           </Form.Group>
 
         <Form.Group controlId="email-1">
           <Form.ControlLabel>Product Catagory</Form.ControlLabel>
           <InputPicker data={data1} block   placeholder='Product Catagory'  onChange={(e)=>{setCatagorynameid(e);   found2=data1.find(({value})=>value==e);  setCatagorynameselect(found2.label)}}/>
         </Form.Group>

         
         <Form.Group controlId="name-44">
           <Form.ControlLabel>Product Color</Form.ControlLabel>
           <Form.Control  onChange={handleProductColor} name="name"  placeholder='Product Color'/>
           {productColor.map(item =>(
            item&&
              <span style={{width:'15px',height:"15px",background:`#${item}`,display:"inline-block" ,marginTop:"5px",marginLeft:"5px"}}></span>
            
              
           ))}
          </Form.Group>
         
        
 
        <div>
      <p>Product Size</p>
      <Checkbox
        indeterminate={value.length > 0 && value.length < check_box.length}
        checked={value.length === check_box.length}
        onChange={handleCheckAll}
      >
        Check all
      </Checkbox>
      <CheckboxGroup inline name="checkboxList" value={value} onChange={handleChange}>
        {check_box.map(item => (
          <Checkbox key={item} value={item}>
             {item}
          </Checkbox>
        ))}
      </CheckboxGroup>
    
      </div> 
        
 
         <Form.Group>
           <ButtonToolbar>
             <Button appearance="primary" onClick={handleProductsubmit}>Submit Product</Button>
             <Button appearance="default">Cancel</Button>
           </ButtonToolbar>
         </Form.Group>
       </Form>
          }
           {brand&&
          <Form fluid>

          <Form.Group controlId="name-1">
           <Form.ControlLabel>Product Brand</Form.ControlLabel>
           <Form.Control name="name"  placeholder='Product Brand' onChange={(e)=>setProductbrand(e)}/>
          </Form.Group>
          
      <Form.Group>
        <ButtonToolbar>
          <Button appearance="primary" onClick={handleBrandSubmit}>Submit</Button>
          <Button appearance="default">Cancel</Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>

      }

      {catagory&&
                <Form fluid>
                <Form.Group controlId="name-1">
                <Form.ControlLabel>Product Catagory</Form.ControlLabel>
                <Form.Control name="name"  placeholder='Product Catagory' onChange={(e)=>setProductcatagory(e)}/>
                </Form.Group>
                
            <Form.Group>
              <ButtonToolbar>
                <Button appearance="primary" onClick={handleCatagorySubmit}>Submit</Button>
                <Button appearance="default">Cancel</Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>

       }

       {cupon&&
       <>
      <Form fluid>

      <Form.Group controlId="name-1">
       <Form.ControlLabel>Cupon Name</Form.ControlLabel>
       <Form.Control name="name"  placeholder='Cupon Name' onChange={(e)=>setCuponName(e)}/>
      </Form.Group>

      <Form.Group controlId="name-1">
       <Form.ControlLabel>Discount</Form.ControlLabel>
       <Form.Control name="name"  placeholder='Discount' onChange={(e)=>setDiscount(e)}/>
      </Form.Group>
              
          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handlecuponData}>Submit</Button>
          
            </ButtonToolbar>
          </Form.Group>
        </Form>


        <Table
      height={400}
      data={cupondata}
      onRowClick={rowData => {
        console.log(rowData);
      }}
    >
      <Column width={60} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="_id" />
      </Column>

      <Column width={250}>
        <HeaderCell>Cupon Name</HeaderCell>
        <Cell dataKey="cuponname" />
      </Column>

      <Column width={250}>
        <HeaderCell>Discount Name</HeaderCell>
        <Cell dataKey="discount" />
      </Column>

    
      

      <Column width={280} fixed="right">
        <HeaderCell>...</HeaderCell>

        <Cell>
          {rowData => (
            <>
            <span>
              <a onClick={() => handleEditCupon(rowData._id)}> Edit </a>
            </span>
             <span style={{marginLeft:"50px"}}>
             <a onClick={() => handleDeleteCupon(rowData._id)}> Delete </a>
           </span>
           </>
          )}
        </Cell>
      </Column>
    </Table>

        </>
       }
    
      </Col>
     
    </Row>
    
    </div>
  )
}

export default Dashboard