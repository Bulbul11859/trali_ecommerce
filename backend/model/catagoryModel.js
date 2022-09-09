const mongoose=require('mongoose')
const {Schema}=mongoose

const catagorySchema = new Schema({
    catagory:{
        type:String,
        required:true,
        unique:true
    }
      
  });
  const Catagory=mongoose.model('catagory', catagorySchema);

  module.exports=Catagory