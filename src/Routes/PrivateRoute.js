import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getUser, restoreUser, verifyUser } from '../Components/utils'
import jwtDecode from 'jwt-decode'

class PrivateRoute extends React.Component {
    state = {
        loading: true,
        isAuthenticated: false,
    }
    componentDidMount() {
        verifyUser().then((isAuthenticated) => {
            this.setState({
                loading: false,
                isAuthenticated,
            });
        });
    }
    render() {
        const { component: Component, ...rest } = this.props;
        if (this.state.loading) {
            return <div>LOADING</div>;
        }
        else return (
            <Route {...rest} render={props =>
                this.state.isAuthenticated ? (
                    <Component {...this.props} />
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
            }
            />
        )
    }
}

export default PrivateRoute