const mongoose = require("mongoose");

const productSchema =new mongoose.Schema({
    categoryId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category"
    },
    subcategoryId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "subcategory"
    },
    name:{
        type: String,
        required: true,
        trim: true,
      
    },
    price:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    description:{
        type: String,
       
    },
    stock:{
        type: Number,
      
    },
    
    image:{
        type: [],
        required: true,
    
    },
    status:{
        type: Number,
       default: 0
    }
   

},{timestamps:true})

const Product = mongoose.model("product", productSchema)
module.exports = {Product}