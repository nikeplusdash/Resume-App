import React from "react"
import {Link, useLocation} from "react-router-dom"
import { DesignPalette } from '../Components/utils'
import '../css/resume.css'

class Login extends React.Component {
    render() {
        return (
            "Hi"
        )
    }
}

class Register extends React.Component {
    render() {
        return (
            "Hello"
        )
    }
}

class Resume extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            origin: (this.props.location.origin === undefined?1:parseInt(this.props.location.origin))
        }
    }
    render() {
        return (
            <div className="logScreen">
                <canvas className="linesCtx" />
                <div className="bar1">
                    {/* render the component here */}
                    {this.state.origin?<Register />:<Login />}
                </div>
                <div className="bar2"></div>
            </div>
        )
    }
}

export default Resume