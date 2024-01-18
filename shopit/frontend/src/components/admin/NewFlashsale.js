import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './SideBar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createFlashsale, clearError } from '../../actions/flashsaleAction'
import { NEW_FLASHSALE_RESET } from '../../constants/flashsaleConstant'
import { useNavigate } from 'react-router-dom'

const NewFlashSale = () => {

    const [product, setProduct] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [isActive, setIsActive] = useState(false);
    const [discountPercent, setDiscountPercent] = useState(0);

    const history = useNavigate()

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newFlashSale);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError())
        }

        if (success) {
            history('/admin/flashSales');
            alert.success('Flash Sale created successfully');
            dispatch({ type: NEW_FLASHSALE_RESET })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const flashSaleData = {
            product,
            startTime,
            endTime,
            isActive,
            discountPercent
        }

        dispatch(createFlashsale(flashSaleData))
    }

    return (
        <Fragment>
            <MetaData title={'New Flash Sale'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">New Flash Sale</h1>

                                <div className="form-group">
                                    <label htmlFor="product_field">Product ID</label>
                                    <input
                                        type="text"
                                        id="product_field"
                                        className="form-control"
                                        value={product}
                                        onChange={(e) => setProduct(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="startTime_field">Start Time</label>
                                    <input
                                        type="datetime-local"
                                        id="startTime_field"
                                        className="form-control"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="endTime_field">End Time</label>
                                    <input
                                        type="datetime-local"
                                        id="endTime_field"
                                        className="form-control"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="isActive_field">Is Active</label>
                                    <input
                                        type="checkbox"
                                        id="isActive_field"
                                        className="form-control"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="discountPercent_field">Discount Percent</label>
                                    <input
                                        type="number"
                                        id="discountPercent_field"
                                        className="form-control"
                                        value={discountPercent}
                                        onChange={(e) => setDiscountPercent(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewFlashSale
