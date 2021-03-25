import React,{useState, useEffect} from 'react';
import { getSearchProducts } from '../api/apicalls'
import { Link } from 'react-router-dom'




const SearchProducts = ({ location}) => {
  
   
    const [products, setProducts] = useState([]);
    let search = location.search.replace('?name=','');
  
    const preload =(data)=>{
        getSearchProducts(data)
        .then(response=>{
            console.log("product "+response )
            setProducts(response)
        })
    }
    useEffect(() => {
        preload(location.search);
        
    }, [location.search]);


    return (
        <div>
            
            <div className="container py-5">
                <h3 className="h3 py-3 ">Search Results for "{search}"</h3>
                <div className="row">
                    {/* <div class="col-md-3 col-sm-6">
                        <div class="product-grid6">
                            <div class="product-image6">
                                <a href="#">
                                    <img class="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo10/images/img-1.jpg"/>
                                </a>
                            </div>
                            <div class="product-content">
                                <h3 class="title"><a href="#">Men's Shirt</a></h3>
                                <div class="price">$11.00
                                    <span>$14.00</span>
                                </div>
                            </div>
                            <ul class="social">
                                <li><a href="" data-tip="Quick View"><i class="fa fa-search"></i></a></li>
                                <li><a href="" data-tip="Add to Wishlist"><i class="fa fa-shopping-bag"></i></a></li>
                                <li><a href="" data-tip="Add to Cart"><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                    </div> */}
                   { 
                    products ?
                       products.map((products, index)=>{
                           return(
                            <div className="col-md-3 col-sm-6" key={products._id}>
                                <div className="product-grid6">
                                    <div className="product-image6">
                                        <Link to={`product/${products._id}`}>
                                            <img alt="" className="pic-1" src={`http://localhost:5000/uploads/${products.image[0]}`}/>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <Link to=""><h3 className="title"><a href="#">{products.name}</a></h3></Link>
                                        <div className="price">
                                                                    {products.price}               
                                        </div>
                                    </div>
                                    <ul className="social ">
                                       
                                        <li><a href="" data-tip="Add to Cart"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                           );
                       }) :

                       <div class="text-center">
                           <h2>No Such Products Found!</h2>
                       </div>
                   }
             
            
                  
                </div>
            </div>
        </div>
    );
}

export default SearchProducts;
