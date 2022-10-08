const mongoose=require('mongoose')
const {Schema}=mongoose

const cuponSchema = new Schema({
    cuponname:{
        type:String,
        required:true,
        unique:true
    },
    discount:{
        type:String,
        required:true,
    }
      
  });
  const Cupon=mongoose.model('cupon', cuponSchema);

  module.exports=Cupon