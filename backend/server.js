const express = require('express')
const mongoose = require('mongoose');

const bannerData = require('./bannerData')
const logoData = require('./logoData')

const dealData=require('./dealData')
const productData=require('./productData')

const Brand=require('./model/brandModel.js')
const Cat=require('./model/catagoryModel.js')
const Product=require('./model/productModel.js')
const Cupon=require('./model/cuponModel.js')
const User=require('./model/usermodel.js')

require("dotenv").config()
const stripe=require('stripe')(process.env.SECRET_KEY)


const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://Trali:83407708@cluster0.cvlcm.mongodb.net/trali?retryWrites=true&w=majority',()=>{
   console.log("DB Connected")
});

const app = express()
var cors = require('cors');
const { request } = require('express');
app.use(cors())


app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/registration', function (req, res) {
 
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    console.log(hash)
    let user={
      name:req.body.name,
      email:req.body.email,
      password:hash,
      confirmpassword:hash
    }
    const users=new User(user)
    users.save()
   res.send('Hello World')
});

})

app.post('/login',async function (req, res) {
  const data =await User.find({email:req.body.email})
  if(data){
    console.log(data[0].password)
    bcrypt.compare(req.body.password, data[0].password, function(err, result) {
       if(result){
        res.send({data:data[0],msg:"Account Found"})
       }
       else{
        res.send({msgError:"Wrong Password"})
       }
  });
  }
 
})

app.put('/login/:id',(req,res)=>{
  console.log(req.params.id)
  User.findByIdAndUpdate(req.params.id,{isVendor:true},{returnOriginal:false},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      res.send(docs)
    }
  })
  
})




//brand
app.post('/brand',(req,res)=>{
  console.log(req.body.brand)
  
  let brandInfo={
       brand:req.body.brand
  }
  const brand=new Brand(brandInfo)
  brand.save()
  res.send(brand)
})



app.get('/brand',async(req,res)=>{
  const data=await Brand.find({})
  res.send(data)
})

//Catagory

app.post('/catagory',(req,res)=>{
  console.log(req.body.catagory)
  let catagoryInfo={
       catagory:req.body.catagory
  }
  const cat=new Cat(catagoryInfo)
  cat.save()
})

app.get('/catagory',async(req,res)=>{
    const data=await Cat.find({})
    res.send(data)
   
})

app.get('/banner', function (req, res) {
  res.send(bannerData)
})

app.get('/logo', function (req, res) {
  res.send(logoData)
})
app.get('/deal', function (req, res) {
  res.send(dealData)
})


app.post('/product', function (req, res) {
  console.log(req.body.productsize)
  let productInfo={

    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    image:req.body.image,
    brand:req.body.brand,
    brandname:req.body.brandname,
    catagory:req.body.catagory,
    catagoryname:req.body.catagoryname,
    productsize:req.body.productsize,
    productcolor:req.body.productcolor,
    owner :req.body.owner
  }

  const product=new Product(productInfo)
  product.save()
  res.send("hello")
})

app.get('/product',async function (req, res) {
  let data=await Product.find({})
  res.send(data)
})


app.post('/cupon', function (req, res) {
  console.log(req.body.cuponname)
  console.log(req.body.discount)
  let cuponInfo={
    cuponname:req.body.cuponname,
    discount:req.body.discount
  }
  const cupon=new Cupon(cuponInfo)
  cupon.save()
  res.send("hello")
    
})



app.get('/cupon/:cupon',async function (req, res) {

  let data=await Cupon.find({cuponname:req.params.cupon})
  console.log(req.params.cupon)
  res.send(data)
})



app.get('/cuponlist',async function (req, res) {
  
  let data=await Cupon.find({})
  res.send(data)
})

app.post('/cuponlist/:id',async function (req, res) {
  console.log(req.params.id)
  Cupon.findByIdAndRemove(req.params.id,()=>{
    
  })

})



app.post('/payment',async function (req, res) {
  await stripe.charges.create({
    source:req.body.token.id,
    amount:req.body.amount,
    currency:'BDT'
  })
   
})

app.get('/productdetails/:id',async function (req, res) {
  
  let data=await Product.findById(req.params.id)
  res.send(data)

})





app.listen(8000,()=>{
    console.log("server running on port 8000")
})