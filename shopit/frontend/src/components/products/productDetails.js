import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import ListReview from "../review/ListReview";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../actions/cartAction";
import { getProductDetails, clearError } from "../../actions/productAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";
import { newReview } from "../../actions/productAction";
const ProductDetails = () => {
    const [rating, setRating] = useState(0);
    const [quantity, setQuantity] = useState(1)
    const [comment, setComment] = useState('');

    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, product } = useSelector(state => state.productDetails)
    const { error: reviewError, success } = useSelector(state => state.newReview)

    useEffect(() => {
        dispatch(getProductDetails(id))
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearError())
        }

        if (success) {
            alert.success('Reivew posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
        }

    }, [dispatch, alert, error, id, success, reviewError])

    const decreQuan = () => {
        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }
    const increQuan = () => {
        const count = document.querySelector('.count')

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }
    const addToCart = () => {
        if (product.stock > 0) {
            dispatch(addItemToCart(id, quantity));
            alert.success('Item Added to Cart')
        }
        else
            alert.error('Product out of Stock')
    }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', id);

        dispatch(newReview(formData));
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="product_image_area">
                        <div className="container">
                            <div className="row s_product_inner">
                                <div className="col-lg-6">
                                    <div className="single-prd-item">
                                        {product && product.images && <img className="img-fluid" src={product.images.url} alt={product.name} />}
                                    </div>
                                </div>
                                <div className="col-lg-5 offset-lg-1">
                                    <div className="s_product_text">
                                        <h3>{product.name}</h3>
                                        <h2>${product.price}</h2>
                                        <ul className="list">
                                            <li><span>Category: </span>{product.category}</li>
                                            <li><span>In Stock: </span>{product.stock}</li>
                                        </ul>
                                        <p>{product.shortDescription}</p>
                                        <div className="product_count">
                                            <label for="qty">Quantity:</label>
                                            <span className="btn btn-danger minus" onClick={decreQuan}>-</span>
                                            <input type="Number" name="qty" size="2" maxlength="2" value={quantity} readOnly title="Quantity:" className="input-text qty count" />
                                            <span className="btn btn-primary plus" onClick={increQuan}>+</span>
                                            <button className="button primary-btn stylish-button" onClick={addToCart} >Add to Cart</button>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="product_description_area">
                        <div className="container">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Description</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile"
                                        aria-selected="false">Specification</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review"
                                        aria-selected="false" onClick={setUserRatings}>Reviews</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <p>{product.LongDescription}</p>

                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <h5>Release Date</h5>
                                                    </td>
                                                    <td>
                                                        <h5>{product && product.info && product.info.releaseDate}</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h5>Dimension</h5>
                                                    </td>
                                                    <td>
                                                        <h5>{product && product.info && product.info.dimension}</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h5>Weight</h5>
                                                    </td>
                                                    <td>
                                                        <h5>{product && product.info && product.info.weight}</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h5>Warranty</h5>
                                                    </td>
                                                    <td>
                                                        <h5>{product && product.info && product.info.quanranty}</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h5>Included with</h5>
                                                    </td>
                                                    <td>
                                                        <h5>{product && product.info && product.info.included}</h5>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane fade " id="review" role="tabpanel" aria-labelledby="review-tab">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="row total_rate">
                                                <div className="col-11">
                                                    <div className="box_total">
                                                        <h5>Overall</h5>
                                                        <h4>{product.rating}</h4>
                                                        <h6>{product.numOfReviews}</h6>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="review_list">
                                                {product.reviews && product.reviews.length > 0 && (
                                                    <ListReview reviews={product.reviews} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="review_box">
                                                <h4>Add a Review</h4>
                                                <p>Your Rating:</p>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >
                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-dark" onClick={reviewHandler}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>




                </Fragment>

            )}
        </Fragment>
    )

}
export default ProductDetails