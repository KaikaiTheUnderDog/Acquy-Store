import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import { login, clearError } from '../../actions/userAction'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert()
    const history = useNavigate()

    const dispatch = useDispatch()

    const { isAuthenicated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenicated) {
            history(`/#`)
        }

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
    }, [dispatch, alert, error, history, isAuthenicated])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`Login`}
                    ></MetaData>

                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="link-group">
                                    <Link to="/password/forgot" className="link">Forgot Password?</Link>
                                    <Link to="/register" className="link">New User?</Link>
                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>


                            </form>
                        </div>
                    </div>

                </Fragment>
            )

            }
        </Fragment>
    )
}

export default Login