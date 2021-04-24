import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken, restoreSession } from '../Components/utils'
import jwtDecode from 'jwt-decode'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    let token = getToken()
    if (token) {
        let tokenExpiration = jwtDecode(token).exp
        let dateNow = new Date()
        if (tokenExpiration < dateNow.getTime() / 1000) {
            try {
                restoreSession()
                setIsAuthenticated(true)
            }
            catch { 
                setIsAuthenticated(false)
            }
        } else {
            setIsAuthenticated(true)
        }
    } else {
        setIsAuthenticated(false)
    }

    if (isAuthenticated === null) {
        return <></>
    }

    return (
        <Route {...rest} render={props =>
            !isAuthenticated ? (
                <Redirect to='/login' />
            ) : (
                <Component {...props} />
            )
        }
        />
    )
}

export default PrivateRoute