const route = require('express').Router();
const { insertCart, getCartData, updateCart,deleteCart } = require('../controllers/cart');
const { userById } = require('../controllers/user');


//params
route.param('id',userById)

route.post('/addCart/:id',insertCart )

//GET
route.get('/getCart/:id',getCartData )

//UPDATE
route.patch('/updateCart/:id',updateCart)

//DELETE
route.delete('/deleteCart/:id/:prodId', deleteCart)

module.exports = route; 
