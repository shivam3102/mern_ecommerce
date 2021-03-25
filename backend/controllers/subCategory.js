const { SubCategory } = require("../models/SubCategory")


//Route PARAM
//desc to get a particular subcategory by id

const getSubCategoryByID =async (Req, res, next, id)=>{
    try {
        const subcategory=await SubCategory.findById(id)
        if(subcategory){

            req.subCategory = subcategory
            next();
        }else{
            res.status(200).json({
                error:"failed to get subcategory by ID"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: "Problem in subcategoryById"
        },err)
    }

}

//Route GET
//get a subCategory

const getASubCategory =async (req,res)=>{
    try {
        const getsinglSubCategory =await SubCategory.findOne({_id:req.subCategory._id})
    }
     catch (err) {
        res.status(400).json({
            error: "Problem in subcategoryById"
        },err)
    }

}

const createSubCategory = async (req, res) =>{
    try {   
        req.body.categoryId = req.category._id
        
        const subcategory = new SubCategory(req.body)
        const subcategoryCreate = await subcategory.save()
        if(subcategoryCreate){
            res.status(200).json(subcategoryCreate)
        }else{
            res.status(400).json({
                error: "failed to create subcategory"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: "Problem in createSubCategory"
        },err)
    }
}

const getSubCategoriesByCategoryId =async (req , res ) =>{
    try {
        const allSubCategories=  await SubCategory.find({categoryId: req.category._id})
        if(allSubCategories){
            res.status(200).json(allSubCategories)
        }else{
            res.status(400).json({
                error: "failed to get subcategories by category Id"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: "Problem in fetching SubCategories by category id"
        },err)
    }
}
const getSubCategories = async (req , res ) =>{
    try {
        const allSubCategories=  await SubCategory.find()
        if(allSubCategories){
            res.status(200).json(allSubCategories)
        }else{
            res.status(400).json({
                error: "failed to get all subcategories"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: "Problem in fetch all SubCategories"
        },err)
    }
}


//Route DELETE
//Delete a subcategory

const deleteSubCategory = async (req , res ) =>{
    try {
        const subCategoryDelete=  await SubCategory.findByIdAndDelete(req.subCategory._id)
        if(subCategoryDelete){
            res.status(200).json(subCategoryDelete)
        }else{
            res.status(400).json({
                error:  `Successfully Deleted ${subCategoryDelete.name}`   
            })
        }
    } catch (err) {
        res.status(400).json({
            error: "Problem in fetch delete SubCategory"
        },err)
    }
}

//Route PATCH
//update a subcategory
const updateSubCategory = async (req, res)=>{
    try {
        const subCategoryUpdate = await Category.findByIdAndUpdate(req.subCategory._id, req.body,{new:true,useFindAndModify: false })
        if(subCategoryUpdate){
            res.status(200).json({
                error: `Successfully Updated ${subCategoryUpdate.name}`    
            })
        }else{
            res.status(400).json({
                error:"failed to update a category"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: "problem in updateCategories"
        },err)
    }
}

module.exports = {
    getSubCategoryByID,
    getASubCategory,
    createSubCategory,
    getSubCategoriesByCategoryId,
    getSubCategories,
    deleteSubCategory,
    updateSubCategory

}