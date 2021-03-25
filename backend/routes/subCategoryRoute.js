const route = require("express").Router();
const { userById } = require("../controllers/user");
const { getCategoryById } = require("../controllers/category");
const {createSubCategory, getASubCategory, getSubCategoryByID, getSubCategories, getSubCategoriesByCategoryId, deleteSubCategory, updateSubCategory} = require("../controllers/subCategory");

//PARAMS
route.param('id',userById);
route.param('categoryId', getCategoryById);
route.param('subcategoryId', getSubCategoryByID);
//GET
route.get('/subcategory/create/:categoryId/:id',createSubCategory)
route.get('/getSubCategoryById/:subcategoryId',getASubCategory)
route.get('/getsubcategories/',getSubCategories)
route.get('/getSubCategoriesByCategoryId/:categoryId',getSubCategoriesByCategoryId)

//POST
route.post('/subcategory/create/:categoryId/:id',createSubCategory)

//DELETE
route.delete('/deleteSubcategory/:subcategoryId/:id', deleteSubCategory)

//PATCH
route.delete('/updateSubcategory/:subcategoryId/:id', updateSubCategory)

module.exports = route;