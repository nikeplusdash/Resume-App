import React from "react"
import { DesignPalette } from './utils'
import '../css/resume.css'

class Resume extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: props.themeVal
        }
    }
    render() {
        return (
            <div className="resume">
            </div>
        )
    }
}

export default Resume