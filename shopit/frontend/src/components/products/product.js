import React from "react";
import { Link } from "react-router-dom"
import { addItemToCart } from "../../actions/cartAction";
import "../../App.css"
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
const Product = ({ product }) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const addToCart = () => {
        dispatch(addItemToCart(product._id, 1));
        alert.success('Item Added to Cart')
    }
    return (
        <div key={product._id} className="col-md-6 col-lg-3">
            <div className="card text-center card-product">
                <div className="card-product__img">
                    <img className="card-img" src={product.images.url} alt={product.name}></img>
                        <ul className="card-product__imgOverlay">
                            
                            <li><button onClick={addToCart}><i className="ti-shopping-cart"></i></button></li>
                            
                        </ul>
                </div>
                <div className="card-body">
                    <p>{product.category}</p>
                    <h4 className="card-product__title">
                        <Link to={`/product/${product._id}`} >{product.name}
                        </Link>
                    </h4>
                    <p className="card-product__price">${product.price}</p>
                </div>
                <Link to={`/product/${product._id}`}></Link>
            </div>
        </div>
    )
}

export default Product