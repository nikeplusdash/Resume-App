import React from "react"
import { DesignPalette } from './utils'
import '../css/resume.css'

class Resume extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: props.themeVal,
            image: {
                isImage: false,
                imageURL: ''
            },
            fname: '',
            lname: '',
            position: '',
            description: '',
            content: {
                sections: [
                    {
                        type: '',
                        title: '',

                    }
                ]
            }
        }
    }
    render() {
        return (
            <div className="resume" style={{ marginTop: (this.props.referrer === 'home'?"-35%":"5%") }}>
            </div>
        )
    }
}

export default Resume