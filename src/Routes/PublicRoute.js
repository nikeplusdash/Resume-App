import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { verifyUser } from '../Components/utils'

class PublicRoute extends React.Component {
    state = {
        loading: true,
        isAuthenticated: false,
    }
    async componentDidMount() {
        verifyUser().then((isAuthenticated) => {
            this.setState({
                loading: false,
                isAuthenticated: isAuthenticated,
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
                this.state.isAuthenticated?<Redirect to={{ pathname:'/ResumeHandler' }} />:<Component {...this.props} />
            }
            />
        )
    }
}

export default PublicRoute