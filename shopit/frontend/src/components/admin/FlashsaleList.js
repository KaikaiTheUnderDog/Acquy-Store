import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './SideBar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allFlashsales,clearError,  deleteFlashsale } from '../../actions/flashsaleAction'

const FlashSaleList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, flashsales } = useSelector(state => state.allFlashsales);

    useEffect(() => {
        dispatch(allFlashsales());

        if (error) {
            alert.error(error);
            dispatch(clearError())
        }

    }, [dispatch, alert, error])

    const deleteFlashsaleHandler = (id) => {
        dispatch(deleteFlashsale(id))
    }

    const setFlashes = () => {
        const data = {
            columns: [
                {
                    label: 'Flashsale ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Product ID',
                    field: 'product',
                    sort: 'asc'
                },
                {
                    label: 'Start Time',
                    field: 'startTime',
                    sort: 'asc'
                },
                {
                    label: 'End Time',
                    field: 'endTime',
                    sort: 'asc'
                },
                {
                    label: 'Is Active',
                    field: 'isActive',
                    sort: 'asc'
                },
                {
                    label: 'Discount Percent',
                    field: 'discountPercent',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        flashsales.forEach(flashsale => {
            data.rows.push({
                id: flashsale._id,
                product: flashsale.product,
                startTime: flashsale.startTime,
                endTime: flashsale.endTime,
                isActive: flashsale.isActive ? 'Yes' : 'No',
                discountPercent: `${flashsale.discountPercent}%`,
                actions: <Fragment>
                    <Link to={`/admin/flashsale/${flashsale._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteFlashsaleHandler(flashsale._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'All Flash Sales'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Flash Sales</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setFlashes()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default FlashSaleList
