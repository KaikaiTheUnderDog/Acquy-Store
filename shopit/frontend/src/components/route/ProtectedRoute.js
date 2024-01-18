import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {

    const { isAuthenicated } = useSelector(state => state.auth)

    return (
        isAuthenicated ? <Outlet/> : <Navigate to='/login' /> 
    )

}

export default ProtectedRoute

