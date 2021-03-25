const mongoose = require("mongoose");

const orderSchema =new mongoose.Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"user"  
    },
    email:{
        type: String,
        required: true
    },
    paymentID:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    cart:{
        type: Array,
         default:[]
    },
   
    totalPrice:{
        type: Number,  
    },
    status:{
        type:Number,
        default: 1  // failed = 0, success = 1
    }
    
},{timestamps:true})

const Order = mongoose.model("order", orderSchema)
module.exports = {Order}