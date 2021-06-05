import React, { useState } from "react"
import $ from "jquery"
import { DesignPalette, dummyUserData } from './utils'
import '../css/resume.css'
import img from '../user.svg'
import 'font-awesome/css/font-awesome.min.css';

class Resume extends React.Component {
    constructor(props) {
        super(props)
        this.state = dummyUserData
        this.generateChildren = this.generateChildren.bind(this)
    }

    generateChildren(key, information) {
        switch (key) {
            case "education":
                return (
                    <div className="education mfield">
                        <h1>Education</h1>
                        {
                            information.map(field => {
                                return (
                                    <div className="detail-field">
                                        <div className="field-r1">
                                            <div className="field-r1-c1"><div className="field-place">{field.place}</div></div>
                                            <div className="field-r1-c2">
                                                <div className="field-from">{field.from}</div>&nbsp;-&nbsp;
                                                <div className="field-to">{field.isCurrent ? "present" : field.to}</div>
                                            </div>
                                        </div>
                                        <div className="field-type">{field.type}</div>
                                        <div className="field-marks">{field.scale + ": " + field.marks}</div>
                                        <div className="field-desc">{field.desc}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            case "organization":
                return (
                    <div className="organization mfield">
                        <h1>Organization</h1>
                        {
                            information.map(field => {
                                return (
                                    <div className="detail-field">
                                        <div className="field-r1">
                                            <div className="field-r1-c1"><div className="field-place">{field.place}</div></div>
                                            <div className="field-r1-c2">
                                                <div className="field-from">{field.from}</div>&nbsp;-&nbsp;
                                                <div className="field-to">{field.isCurrent ? "present" : field.to}</div>
                                            </div>
                                        </div>
                                        <div className="field-desc">{field.desc}</div>
                                        <div className="field-referal">{field.referal}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            case "experience":
                return (
                    <div className="experience mfield">
                        <h1>Experience</h1>
                        {
                            information.map(field => {
                                return (
                                    <div className="detail-field">
                                        <div className="field-r1">
                                            <div className="field-r1-c1"><div className="field-place">{field.place}</div></div>
                                            <div className="field-r1-c2">
                                                <div className="field-from">{field.from}</div>&nbsp;-&nbsp;
                                                <div className="field-to">{field.isCurrent ? "present" : field.to}</div>
                                            </div>
                                        </div>
                                        <div className="field-desc">{field.desc}</div>
                                        <div className="field-referal">{field.referal}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            case "projects":
                return (
                    <div className="projects mfield">
                        <h1>Projects</h1>
                        {
                            information.map(field => {
                                return (
                                    <div className="detail-field">
                                        <div className="field-r1">
                                            <div className="field-r1-c1"><div className="field-place">{field.place}</div></div>
                                            <div className="field-r1-c2">
                                                <div className="field-from">{field.from}</div>&nbsp;-&nbsp;
                                                <div className="field-to">{field.isCurrent ? "present" : field.to}</div>
                                            </div>
                                        </div>
                                        <div className="field-desc">{field.desc}</div>
                                        <div className="field-referal">{field.referal}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            case "interests":
                return (
                    <div className="interests mfield">
                        <h1>Interests</h1>
                        <div className="field-row">
                            {information.map(field => <div className="field-row-data">{field}</div>)}
                        </div>
                    </div>
                )
            case "languages":
                console.log(information)
                return (
                    <div className="languages mfield">
                        <h1>Languages</h1>
                        <div className="field-column">
                            {information.items.map(field => <div className="progress-row-data"><div className="progress-name">{field.name}</div><progress className="pbar" value={field.proficiency*information.scale} max={information.scale}></progress></div>)}
                        </div>
                    </div>
                )
            case "skills":
                return (
                    <div className="skills mfield">
                        <h1>Skills</h1>
                        <div className="field-row">
                            {information.map(field => <div className="field-row-data">{field}</div>)}
                        </div>
                    </div>
                )
        }
    }

    render() {
        return (
            <div className="resume" style={{ marginTop: (this.props.referrer === 'home' ? "-35%" : "5%") }}>
                <div className="header">
                    <div className="header-c1">
                        <div className="highlighter-shape">
                            <img src={img} alt="" />
                        </div>
                    </div>
                    <div className="header-c2">
                        <div className="name">{this.state.name}</div>
                        <div className="current">{this.state.current}</div>
                        <div className="description">{this.state.description}</div>
                    </div>
                </div>
                <div className="highlight">
                    {
                        this.state.display.highlight.map((highlightField) => {
                            let field = this.state.highlight.filter(field => field.type === highlightField)[0]
                            return (
                                <div className="highlight-field" key={field.type}>
                                    <div className={"highlight-field-c1 fa fa-" + field.type}></div>
                                    <div className="highlight-field-c2">{field.data}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="details-container">
                    {
                        this.state.display.main.map((infoField) => {
                            let infoDetails = this.state[infoField]
                            return this.generateChildren(infoField, infoDetails)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Resume