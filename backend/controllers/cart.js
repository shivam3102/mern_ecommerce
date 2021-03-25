const { User } = require("../models/User");

const insertCart =async (req, res)=>{
    try {

        const userBody = req.body;
       const userData =  req.profile;

         const productData={
             productId : userBody._id,
             productName: userBody.name,
             productQuantity : 1,
             productPrice : userBody.price,
             productImage : userBody.image
         } 
         const userCart = userData.cart;
         
         const cartExists = userCart.some(cart => cart.productId === productData.productId);
         if(cartExists) {
            console.log("no already exist");
            
         }else{
             userData.cart.push(productData);       
            const cart = await User.findByIdAndUpdate(req.profile._id, userData,{new:true,useFindAndModify: false })
              if(cart){
                // console.log(" Inserted")
                  res.status(200).json({
                      error: `Successfully Added in cart`    
                  })
              }else{
                  // console.log("Not Inserted")
                  res.status(400).json({
                      error:"failed to Add in cart "
                  })
              }
         }
       

    } catch (err) {
        res.status(400).json({ error: 'problem in getuserid'}, err.message)
    }
}
const getCartData = (req, res)=>{
    try {
      const userData =  req.profile.cart;
     
     return res.status(200).json(userData);
    } catch (err) {
     return res.status(400).json({ error: 'problem in getcart'}, err.message)
    }
}

const updateCart = async (req, res)=>{
  try {
    
    bodyData = req.body;
    const userCart = req.profile.cart;
    var foundIndex = userCart.findIndex((item) => item.productId === bodyData.productId);
    userCart[foundIndex].productQuantity = bodyData.quantity;

       const cart = await User.findByIdAndUpdate(req.profile._id, req.profile,{new:true,useFindAndModify: false })
       if(cart){
        // console.log(" Inserted")
          res.status(200).json({
              error: `Item upadted successfully `    
          })
      }else{
          // console.log("Not Inserted")
          res.status(400).json({
              error:"failed to update item "
          })
      }
  } catch (err) {
    return res.status(400).json({ error: 'problem in updateCart'}, err.message)
   }
}

const deleteCart = async (req, res) =>{
  try {
    productId = req.params.prodId;
   
    const userCart = req.profile.cart;
    
   const cartData =  userCart.filter((item) => item.productId !== productId);
    req.profile.cart = cartData;
    const cart = await User.findByIdAndUpdate(req.profile._id, req.profile,{new:true,useFindAndModify: false })
       if(cart){
        // console.log(" Inserted")
          res.status(200).json({
              error: `Item removed successfully`    
          })
      }else{
          // console.log("Not Inserted")
          res.status(400).json({
              error:"failed to remove item"
          })
      }
  } catch (err) {
    return res.status(400).json({ error: 'problem in deleteCart'}, err.message)
   }

}

module.exports = {
    insertCart,
    getCartData,
    updateCart,
    deleteCart

}   