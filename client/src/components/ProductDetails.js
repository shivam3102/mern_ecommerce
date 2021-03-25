import React,{useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {getProductById } from '../api/apicalls'

const ProductDetails = () => {
const url = 'http://localhost:5000/uploads/';
    let { id } = useParams();

    const [product, setProduct] = useState([]);
    const [image, setImage ] =useState([])

    const PreLoadGetProductById= (id) =>{
        getProductById(id).then(response=>{
            setProduct(response)
           setImage(Object.values(response.image))
        })
        
    }
    useEffect(() => {
        PreLoadGetProductById(id)
        
    }, []);

    return (
        <div className="container">
		<div className="card">
			<div className="container-fliud">
				<div className="wrapper row">
					<div className="preview col-md-6">
						
						<div className="preview-pic tab-content">
                           
                          {
                              image.map((img,index)=>{
                                return(
                                    <div key={index} className={`tab-pane ${index==0 ? 'active' : ' '}`} id={`pic-${index}`}>
                                        <img alt="" src={url+img} />
                                    </div>
                                );
                              })
                          }
                          
                           
						</div>
						<ul className="preview-thumbnail nav nav-tabs">
                        {
                              image.map((img,index)=>{
                                return(
                                    <li className={`${index==0 ? 'active' : ' '}`} key={index}><a data-target={`#pic-${index}`} data-toggle="tab"><img alt="" src={url+img} /></a></li>
                                );
                              })
                          }
					
						</ul>
						
					</div>
					<div className="details col-md-6">
						<h3 className="product-title">{product.name}</h3>
						<div className="rating">
							<div className="stars">
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star"></span>
								<span className="fa fa-star"></span>
							</div>
							<span className="review-no">41 reviews</span>
						</div>
						
						<h4 className="price">current price: <span>{product.price}</span></h4>
					
						
						<div className="product-count">
	        				<label htmlFor="size">Quantity</label>
	        				<form action="#" className="d-flex">
							    <div className="qtyminus">-</div>
							    <input type="text" name="quantity" value={`1`} className="qty" />
							    <div className="qtyplus">+</div>
							</form>
						
	        			</div>
						<div className="action mt-5">
							<button className="add-to-cart btn btn-default" type="button">add to cart</button>
							{/* <button className="like btn btn-default" type="button"><span className="fa fa-heart"></span></button>  */}
						</div>
					</div>
				</div>
			</div>
		</div>

        <div className="product-info-tabs">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">Reviews (0)</a>
                  </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                             {product.description}
                  </div>
                  <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                      <div className="review-heading">REVIEWS</div>
                      <p className="mb-20">There are no reviews yet.</p>
                      <form className="review-form">
                        <div className="form-group">
                            <label>Your rating</label>
                            <div className="reviews-counter">
                                <div className="rate">
                                    <input type="radio" id="star5" name="rate" value="5" />
                                    <label htmlFor="star5" title="text">5 stars</label>
                                    <input type="radio" id="star4" name="rate" value="4" />
                                    <label htmlFor="star4" title="text">4 stars</label>
                                    <input type="radio" id="star3" name="rate" value="3" />
                                    <label htmlFor="star3" title="text">3 stars</label>
                                    <input type="radio" id="star2" name="rate" value="2" />
                                    <label htmlFor="star2" title="text">2 stars</label>
                                    <input type="radio" id="star1" name="rate" value="1" />
                                    <label htmlFor="star1" title="text">1 star</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Your message</label>
                            <textarea className="form-control" rows="10"></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" name="" className="form-control" placeholder="Name*"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" name="" className="form-control" placeholder="Email Id*"/>
                                </div>
                            </div>
                        </div>
                        <button className="round-black-btn">Submit Review</button>
                    </form>
                  </div>
            </div>
        </div>
	</div>
    );
}

export default ProductDetails;
