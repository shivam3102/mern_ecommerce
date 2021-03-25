const route = require("express").Router();
const {createProduct,getProduct,updateProduct, deleteProduct,getProducts,getProductById, searchProducts } = require("../controllers/product")

//PARAMS
route.param('productId',getProduct)

//GET
route.get('/getProducts',getProducts)
route.get('/getProductById/:productId',getProductById)
route.get('/searchProduct',searchProducts)
//POST
route.post('/createProduct',createProduct)

//PATCH
route.patch('/updateProduct/:productId',updateProduct)

//DELETE
route.delete('/deleteProduct/:productId',deleteProduct)

module.exports= route