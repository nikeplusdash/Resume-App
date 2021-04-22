import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken} from './utils';

const PublicRoute = ({ component: Component, ...rest }) => {
    
    return (
        <Route {...rest} render={props =>
            getToken ? (
                <Redirect to='/dashboard' />
            ) : (
                <Component {...props} />
            )
        }
        />
    );
};

export default PublicRoute;