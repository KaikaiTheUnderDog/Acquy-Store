import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './SideBar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails, clearError } from '../../actions/productAction'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstant'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {

    const history = useNavigate()
    const { id } = useParams()
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [shortDescription, setShortDes] = useState('');
    const [LongDescription, setLongDes] = useState('');
    const [category, setCategory] = useState('Handheld');
    const [stock, setStock] = useState(0);


    const [releaseDate, setReleaseDate] = useState('Not available');
    const [dimension, setDimension] = useState('Not available');
    const [weight, setWeight] = useState('Not available');
    const [quanranty, setQuanranty] = useState('Not available');
    const [included, setIncluded] = useState('Not available');

    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        'Handheld',
        'Controller',
        'Game Card',
        'Accessories',
        'Headphones',
        'Storage Expansion',
        'Console'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);

    const productId = id;

    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        if (product && product._id !== productId || updated) {
            dispatch(getProductDetails(productId));
            setUpdated(false); // Reset the update state after fetching details

        } else {
            setName(product.name);
            setPrice(product.price);
            setShortDes(product.shortDescription);
            setLongDes(product.LongDescription);
            setCategory(product.category);
            if (product.info) {
                setReleaseDate(product.info.releaseDate || 'Not available')
                setDimension(product.info.dimension || 'Not available')
                setQuanranty(product.info.quanranty || 'Not available')
                setIncluded(product.info.included || 'Not available')
                setWeight(product.info.weight || 'Not available')
            }
            setStock(product.stock)
            setOldImages(product.images)
            console.log(oldImages.url)
        }

        if (error) {
            alert.error(error);
            dispatch(clearError())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearError())
        }


        if (isUpdated) {
            history('/admin/products');
            alert.success('Product updated successfully');
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }

    }, [dispatch, alert, oldImages, error, isUpdated, history, updateError, product, productId])


    const submitHandler = (e) => {
        e.preventDefault();

        const info = {
            releaseDate,
            dimension,
            weight,
            quanranty,
            included
        }

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('shortDescription', shortDescription);
        formData.set('LongDescription', LongDescription);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('info', JSON.stringify(info));
        if (images && images.length > 0) {
            formData.set('images', images);
        }
        setUpdated(true); 
        dispatch(updateProduct(product._id, formData))
    }

    const onChange = e => {
        const file = e.target.files[0]; // Get only the first file


        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview([reader.result]); // Set the image preview to the first file only
                    setImages([reader.result]); // Set the images state to the first file only
                }
            }

            reader.readAsDataURL(file);
        }

        setOldImages([]); // Clear the old images
    }



    return (
        <Fragment>
            <MetaData title={'Update Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                    <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Product</h1>
                                <div className="grid-container-two">
                                    <div className="form-group">
                                        <label htmlFor="name_field">Name</label>
                                        <input
                                            type="text"
                                            id="name_field"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="price_field">Price</label>
                                        <input
                                            type="text"
                                            id="price_field"
                                            className="form-control"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid-container-two">
                                    <div className="form-group">
                                        <label htmlFor="description_field">Short Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description_field"
                                            rows="8"
                                            value={shortDescription}
                                            onChange={(e) => setShortDes(e.target.value)}
                                            style={{ width: '500px', height: '180px' }} // Specify the width and height here
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description_field">Long Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description_field"
                                            rows="8"
                                            value={shortDescription}
                                            onChange={(e) => setLongDes(e.target.value)}
                                            style={{ width: '500px', height: '180px' }} // Specify the width and height here
                                        />

                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="grid-container">
                                    <div className="form-group">
                                        <label htmlFor="stock_field">Stock</label>
                                        <input
                                            type="number"
                                            id="stock_field"
                                            className="form-control"
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="releaseDate_field">Release Date</label>
                                        <input
                                            type="text"
                                            id="releaseDate_field"
                                            className="form-control"
                                            value={releaseDate}
                                            onChange={(e) => setReleaseDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="dimension_field">Dimension</label>
                                        <input
                                            type="text"
                                            id="dimension_field"
                                            className="form-control"
                                            value={dimension}
                                            onChange={(e) => setDimension(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid-container">
                                    <div className="form-group">
                                        <label htmlFor="weight_field">Weight</label>
                                        <input
                                            type="text"
                                            id="weight_field"
                                            className="form-control"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                        />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="quanranty_field">Quanranty</label>
                                        <input
                                            type="text"
                                            id="quanranty_field"
                                            className="form-control"
                                            value={quanranty}
                                            onChange={(e) => setQuanranty(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="included_field">Included</label>
                                        <input
                                            type="text"
                                            id="included_field"
                                            className="form-control"
                                            value={included}
                                            onChange={(e) => setIncluded(e.target.value)}
                                        />
                                    </div>
                                    </div>
                                    <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>

                                    {oldImages && (
                                        <img key={oldImages} src={oldImages.url} alt={oldImages.public_id} className="mt-3 mr-2" width="55" height="52" />
                                    )}

                                    {imagesPreview[0] && (
                                        <img src={imagesPreview[0]} key={imagesPreview[0]} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    )}


                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateProduct
