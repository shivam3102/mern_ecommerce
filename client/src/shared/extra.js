import React,{useState, useEffect} from 'react';
import HomeSlider from './HomeSlider';
import { Link } from 'react-router-dom'
import { getHomeProducts } from '../api/apicalls'



const HomeProducts = () => {

    const [products, setProducts] = useState([]);
    
    const preload =()=>{
        getHomeProducts()
        .then(response=>{
            console.log("product "+response )
            setProducts(response)
        })
    }
    useEffect(() => {
        preload();
        
    }, []);

    return (
        <div>
            <HomeSlider/>
            <div className="container py-5">
                <h3 className="h3 py-3 text-center">Products</h3>
                <div className="row">
                   {
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
                                        {/* <li><a href="" data-tip="Quick View"><i className="fa fa-search"></i></a></li>
                                        <li><a href="" data-tip="Add to Wishlist"><i className="fa fa-shopping-bag"></i></a></li> */}
                                        <li><a href="" data-tip="Add to Cart"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                           );
                       })
                   }
             
            
                  
                </div>
            </div>
        </div>
    );
}

export default HomeProducts;
