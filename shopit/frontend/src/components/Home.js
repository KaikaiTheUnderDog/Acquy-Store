import React, { Fragment, useEffect, useState } from "react";
import MetaData from './layout/MetaData';
import Pagination from 'react-js-pagination'

import { useParams } from "react-router-dom";
import Product from "./products/product";
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../actions/productAction";
import { useAlert } from "react-alert";

import "../App.css"



const Home = () => {

    const [currentPage, setCurentpage] = useState(1)
    const [category, setCategory] = useState('All') // Set 'All' as the default category
    const alert = useAlert();
    const dispatch = useDispatch();
    const categories = [
        'All', // Add 'All' as an option in the categories array
        'Handheld',
        'Controller',
        'Game Card',
        'Accessories',
        'Headphones',
        'Storage Expansion',
        'Console'
    ]

    const { keyword } = useParams();

    const { loading, products, error, productCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            console.log(error)
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage, category === 'All' ? '' : category)) // If the selected category is 'All', pass an empty string to getProducts
    }, [dispatch, alert, error, keyword, currentPage, category]) // Add category to the dependency array

    function setCurentpageNo(pageNumber) {
        setCurentpage(pageNumber)
    }

    let count = productCount;
    if (keyword || (category && category !== 'All')) {
        count = filteredProductsCount
    }

    // Add a new function to handle category change
    function handleCategoryChange(category) {
        setCategory(category)
    }



    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Nintendo fake Shop'} />
                    <div className="row">
                        <div className="col-3 d-flex justify-content-center">
                            <div className="list-group text-center" style={{ width: '80%', marginTop: '50px' }}>
                                {categories.map(categoryItem => (
                                    <button
                                        type="button"
                                        className={`list-group-item list-group-item-action ${category === categoryItem ? 'active' : ''}`}
                                        onClick={() => handleCategoryChange(categoryItem)}
                                        style={{ borderRadius: '15px', margin: '5px 0', transition: 'all 0.3s ease' }}
                                    >
                                        {categoryItem}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="col-9">
                            <section className="lattest-product-area pb-40 category-list">
                                <div className="row">
                                    {products && products.map(product => (
                                        <Product key={product._id} product={product}></Product>
                                    ))}
                                </div>
                            </section>
                            {resPerPage <= count &&
                                <div className="d-flex justify-content-center mt-5">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resPerPage}
                                        totalItemsCount={productCount}
                                        onChange={setCurentpageNo}
                                        nextPageText={"NEXT"}
                                        prevPageText={"PREV"}
                                        firstPageText={"<<"}
                                        lastPageText={">>"}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    ></Pagination>
                                </div>
                            }
                        </div>
                    </div>
                </Fragment>

            )}
        </Fragment>

    )
};

export default Home

