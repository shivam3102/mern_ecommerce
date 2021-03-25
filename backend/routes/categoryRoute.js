const route = require('express').Router();
const {createCategory,deleteCategory,getAllCategories, getCategoryById, getCatgory, updateCategory, getCategoriesSub} = require("../controllers/category");
const { userById } = require('../controllers/user');


//params
route.param('id',userById)
route.param('categoryId', getCategoryById);

route.post('/category/create/:id', createCategory)

route.get('/category/:categoryId',getCatgory);
route.get('/categories', getAllCategories);
route.get('/getCategoriesSub',getCategoriesSub)

route.delete('/category/delete/:categoryId/:id', deleteCategory);
route.patch('/category/update/:categoryId/:id', updateCategory);

module.exports = route; 