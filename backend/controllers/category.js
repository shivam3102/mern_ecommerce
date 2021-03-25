const {Category} = require("../models/Category")
const { SubCategory } = require("../models/SubCategory")


//route PARAMS 
//desc to get a particular category by id
const getCategoryById = async (req, res,next, id) =>{
    try {
        const category = await Category.findById(id)
        if(category){
            req.category = category
            next()
        }else{
            res.status(400).json({
                error: "category not found"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: "problem in categoryById"
        },err)
    }
}

//route Get
//fetch a single category by ID
const getCatgory = (req, res)=>{
    res.status(200).json(req.category)
}

//route Post
//Create a category
const createCategory = async (req, res) =>{
    try {
        
        const addCategory = new Category(req.body)
        const category = await addCategory.save()
        if(category){
            res.status(200).json(category)
        }else{
            res.status(400).json({
                error: "failed to add category"
            })
        }

    }  catch (err) {
        res.status(400).json({
            error: "problem in addCategory"
        },err)
    }
} 

//route GET
//fetch All categories
const getAllCategories = async (req, res)=>{
    try {
        const allCategories = await Category.find();
        if(!allCategories){
            return res.status(400).json({
                error:"not found any category"
            })
        }
        return res.status(200).json(allCategories)
    } catch (err) {
        res.status(400).json({
            error: "problem in getAllCategories"
        },err)
    }
}

//route PUT
//Delete a category
const deleteCategory = async (req, res)=>{
    try {
        const categoryDelete =await Category.findByIdAndDelete(req.category._id)
        if(categoryDelete){
            res.status(200).json({
                error: `Successfully deleted ${category.name}`    
            })
        }else{
            res.status(400).json({
                error:"failed to delete a category"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: "problem in deleteCategories"
        },err)
    }
}

//Route PATCH
//update a category
const updateCategory = async (req, res)=>{
    try {
        const categoryUpdate = await Category.findByIdAndUpdate(req.category._id, req.body,{new:true,useFindAndModify: false })
        if(categoryUpdate){
            res.status(200).json({
                error: `Successfully Updated ${categoryUpdate.name}`    
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

const getCategoriesSub = async (req, res)=>{
    try {
        // const allCategories = await SubCategory.find().populate('category')

        const allCategory = await {
            category_name: "$name"
           };
        
        const allCategories =  category.aggregate([{
                    $group: resources
                }, {
                    $lookup: {
                        from: "subcategory", // collection to join
                        localField: "_id",//field from the input documents
                        foreignField: "categoryId",//field from the documents of the "from" collection
                        as: "comments"// output array field
                    }
                }],function (error, data) {
                 return res.json(data);
             //handle error case also
        });
        if(allCategories){
            return res.status(200).json(allCategories)
            
        }else{
            return res.status(400).json({
                error:"not found any category"
            })
        }
      
    } catch (err) {
      res.status(500).json({
            error: "problem in getCategoriesSub"
        },err)
    }
}



module.exports = {
    getCategoryById,
    getCatgory,
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory,
    getCategoriesSub
        
}