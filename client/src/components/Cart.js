import React,{useEffect, useState} from 'react';
import {Link } from 'react-router-dom';
import {getCart,updateCart, removeCartItem } from '../api/apicalls'

const Cart = () => {

    const [userId , setUserId] = useState(localStorage.getItem('user'));
    const [cartData, setCartData] = useState([]);
    const [itemCount , setItemCount] = useState(1);

    const preload =()=>{
        getCart(userId)
        .then(response=>{
            console.log(response.data )
            setCartData(response.data)
        }).catch(error =>{
            console.log(error)
        })
    }
    useEffect(() => {
        preload();
        
    }, []);

    const handleChange =(e)=>{
       
        // setItemCount(e.target.value);
    }
    const minusQuantity =(cartproductId)=>{
        const exist = cartData.find((item)=> item.productId === cartproductId)
        if(exist.productQuantity === 1){
            setCartData(
                cartData.map((x)=>
                    x.productId === cartproductId ? {...exist, productQuantity: 1 }: x
                )
            );
            console.log(cartData)
        }else{
            setCartData(
                cartData.map((x)=>
                    x.productId === cartproductId ? {...exist, productQuantity: exist.productQuantity - 1 }: x
                )
            );
            
        }
        const pro_qty = exist.productQuantity-1;
        if(pro_qty > 0){
            updateCart(userId,cartproductId,pro_qty);   
        }
        
    }
    const plusQuantity =(cartproductId)=>{
        const exist = cartData.find((item)=> item.productId === cartproductId)
        if(exist){
            setCartData(
                cartData.map((x)=>
                    x.productId === cartproductId ? {...exist, productQuantity: exist.productQuantity + 1 }: x
                )
            );
            console.log(cartData)
        }else{
            setCartData([...cartData, {...cartproductId, productQuantity : 1}])
        }

        const pro_qty = exist.productQuantity+1;
        updateCart(userId,cartproductId,pro_qty);   
      
    }
  const productRemove=(productId)=>{
    const cart =  cartData.filter((item) => item.productId !== productId);
    if(cart){
        setCartData(cart);
    }
    removeCartItem(userId,productId);   
  }
     
    const itemPrice = cartData.reduce((a, c)=> a + c.productPrice * c.productQuantity, 0);  //a for PrevState and c for currentState
    const shippingPrice = itemPrice > 2000 ? 0 : 50 ;
    const totalPrice =  shippingPrice + itemPrice;
    return (
        <div className="container">
            <h1>Cart</h1>
        <div className="row py-5">
            <div className=" col-md-12">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Total</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartData.map((cartItem, index)=>{
                                    return (
                                      
                                        <tr key={cartItem.productId}>
                                            <td className="col-md-6">
                                                <div className="media">
                                                    <Link className="thumbnail pull-left" href="#"> 
                                                        <img alt="" className="media-object" src={`http://localhost:5000/uploads/${cartItem.productImage[0]}`} style={{width: '60px', height: '60px'}}/> 
                                                    </Link>
                                                    <div className="media-body ml-1">
                                                        <h6  className="media-heading mb-0"><Link href="#">{cartItem.productName}</Link></h6>
                                                        {/* <h6 className="media-heading mb-0"> by <Link href="#">Brand name</Link></h6> */}
                                                        <small>Status: </small><small className="text-success"><strong>In Stock</strong></small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="col-sm-1 col-md-1 text-center" >
                                                <div className="product-count d-flex mt-0">
                                                    <div className="qtyminus" onClick={()=>minusQuantity(cartItem.productId)}>-</div>
                                                        <input type="text" name="quantity" value={cartItem.productQuantity} className="qty" onChange={handleChange } />
                                                    <div className="qtyplus" onClick={()=>plusQuantity(cartItem.productId)}>+</div>
                                               </div>
                                            {/* <input type="number" className="form-control" onChange={()=>changeQuantity(cartItem.productId)}  minLength="1" value={cartItem.productQuantity} /> */}
                                            </td>
                                            <td className="col-sm-1 col-md-1 text-center"><strong>{cartItem.productPrice}</strong></td>
                                            <td className="col-sm-1 col-md-1 text-center"><strong>{cartItem.productQuantity * cartItem.productPrice}</strong></td>
                                            <td className="col-sm-1 col-md-1">
                                            <button type="button" className="btn btn-danger" onClick={() =>productRemove(cartItem.productId)}>
                                                <span className="glyphicon glyphicon-remove"></span> Remove
                                            </button></td>
                                        </tr>
                                    );
                                })
                            }
                             <tr>
                                <td colSpan="3" className="border-0"></td>
                                <td ><h6>Subtotal</h6></td>
                                <td className="text-right"><h5>{itemPrice}</h5></td>
                            </tr>
                            <tr>
                            <td colSpan="3" className="border-0"></td>
                                <td><h6>Shipping Charges</h6></td>
                                <td className="text-right"><h5>{shippingPrice}</h5></td>
                            </tr>
                            <tr>
                            <td colSpan="3" className="border-0"></td>
                                <td><h3>Total</h3></td>
                                <td className="text-right"><h3><strong>{totalPrice.toFixed(2)}</strong></h3></td>
                            </tr>
                            <tr>
                            <td colSpan="3" className="border-0"></td>
                                <td>
                                <button type="button" className="btn btn-default">
                                    <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                                </button></td>
                                <td>
                                <button type="button" className="btn btn-success">
                                    Checkout <span className="glyphicon glyphicon-play"></span>
                                </button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Cart;
