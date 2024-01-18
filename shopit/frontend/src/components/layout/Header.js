import React, { Fragment } from "react";
import { Routes, Route } from 'react-router-dom'
import { Link } from "react-router-dom";
import Search from "./Search";
import { logout } from "../../actions/userAction";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from 'react-alert'
const Header = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.')
    }

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    return (
        <Fragment>
            <div className="header_area">
                <nav className="navbar row">
                    <div className="col-12 col-md-3">
                        <div className="navbar-brand">
                            <Link to="/">
                                <img src="./images/logo.png" alt="MY WEBSITE LOGO" />
                            </Link>

                        </div>
                    </div>

                    <div className="col-12 col-md-6 mt-2 mt-md-0">
                        <Routes>
                            <Route path="*" element={<Search />} />
                        </Routes>
                    </div>

                    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                        <ul className="nav-shop">
                            <Link to="/cart" style={{ textDecoration: 'none' }}>
                                <li className="nav-item">
                                    <button>Cart
                                        <span className="nav-shop__circle">{cartItems ? cartItems.length : 0}</span>
                                    </button>
                                </li>
                            </Link>

                            {user ? (
                                <div className="ml-4 dropdown d-inline">
                                    <Link to="#!" className="btn dropdown-toggle text-dark mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <figure className="avatar avatar-nav">
                                            <img
                                                src={user.avatar && user.avatar.url}
                                                alt={user && user.name}
                                                className="rounded-circle"
                                            />
                                        </figure>
                                        <span>{user && user.name}</span>
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                        {user && user.role === 'admin' && (
                                            <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                        )}
                                        <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                        <Link className="dropdown-item" to="/me">Profile</Link>
                                        <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                            Logout
                                        </Link>

                                    </div>
                                </div>
                            ) : !loading && <Link to='/login' className="btn ml-4" id="login_btn">Login</Link>}
                        </ul>
                    </div>
                </nav>
            </div>


        </Fragment>
    )

}

export default Header
