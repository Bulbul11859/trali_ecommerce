const mongoose=require('mongoose')
const {Schema}=mongoose

const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'brand',
        required:true
    },
    brandname:{
        type:String,
        required:true
    },
    catagory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'catagory',
        required:true
    },
    catagoryname:{
        type:String,
        required:true
    },
    productsize:{
        type:[String],
        required:true
    },
    productcolor:{
        type:[String],
        required:true
    },
    image:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})

const Product=mongoose.model('product',productSchema)
module.exports=Product