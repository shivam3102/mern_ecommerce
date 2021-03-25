const mongoose = require("mongoose");

const subcategorySchema =new mongoose.Schema({
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    name:{
        type: String,
        required: true,
        trim: true,
        unique:true
    }
    
},{timestamps:true})

const SubCategory = mongoose.model("subcategory", subcategorySchema)
module.exports = {SubCategory}