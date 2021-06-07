import React, { createRef, useState } from "react"
import { DesignPalette, dummyUserData } from './utils'
import Pdf from "react-to-pdf";
import { Button, ProgressBar } from 'react-bootstrap'
import '../css/resume.css'
import img from '../user.svg'
import 'font-awesome/css/font-awesome.min.css';

class Resume extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...((props.referrer === 'home') ? dummyUserData : dummyUserData), theme: props.themeVal }
        this.generateChildren = this.generateChildren.bind(this)
        this.target = createRef()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.themeVal !== this.props.themeVal) {
            this.setState({ theme: this.props.themeVal });
            console.log(this.props.themeVal)
            switch (this.props.themeVal) {
                case "1":
                    document.querySelector(":root").style.setProperty("--gradient-start", "#FF0C0C");
                    document.querySelector(":root").style.setProperty("--gradient-end", "#FF9DC1");
                    document.querySelector(":root").style.setProperty("--font-color", "#FF0C0C");
                    document.querySelector(":root").style.setProperty("--special-font-color", "#FFFFFF");
                    document.querySelector(":root").style.setProperty("--background-gradient", "var(--gradient1-90)");
                    break
                case "2":
                    document.querySelector(":root").style.setProperty("--gradient-start", "#8E40FF");
                    document.querySelector(":root").style.setProperty("--gradient-end", "#00BAFF");
                    document.querySelector(":root").style.setProperty("--font-color", "#8547FF");
                    document.querySelector(":root").style.setProperty("--special-font-color", "#FFFFFF");
                    document.querySelector(":root").style.setProperty("--background-gradient", "var(--gradient2-90)");
                    break
                case "3":
                    document.querySelector(":root").style.setProperty("--gradient-start", "#6FFFD8");
                    document.querySelector(":root").style.setProperty("--gradient-end", "#D5FFA3");
                    document.querySelector(":root").style.setProperty("--font-color", "#6FFFD8");
                    document.querySelector(":root").style.setProperty("--special-font-color", "#000000");
                    document.querySelector(":root").style.setProperty("--background-gradient", "var(--gradient6-90)");
                    break
            }
        }
    }

    options = {
        orientation: 'portrait',
        unit: 'cm',
        format: [297 / 210 * 27, 27]
    };

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
                            {information.map(field => <div className="field-row-data">{field.name}</div>)}
                        </div>
                    </div>
                )
            case "languages":
                console.log(information)
                return (
                    <div className="languages mfield">
                        <h1>Languages</h1>
                        <div className="field-column">
                            {information.map(field => <div className="progress-row-data"><div className="progress-name">{field.name}</div><ProgressBar className="pbar" now={field.proficiency * 100}></ProgressBar></div>)}
                        </div>
                    </div>
                )
            case "skills":
                return (
                    <div className="skills mfield">
                        <h1>Skills</h1>
                        <div className="field-row">
                            {information.map(field => <div className="field-row-data">{field.name}</div>)}
                        </div>
                    </div>
                )
        }
    }

    render() {
        return (
            <>
                <div className="resume" style={{ marginTop: (this.props.referrer === 'home' ? "-35%" : "5%") }} ref={this.target}>
                    <div className="header">
                        {this.state.image.display ?
                            <div className="header-c1">
                                <div className="highlighter-shape">
                                    <img className="setImg" alt="" />
                                </div>
                            </div>
                            : null}
                        <div className="header-c2">
                            <div className="name">{this.state.name}</div>
                            <div className="current">{this.state.current}</div>
                            <div className="description">{this.state.description}</div>
                        </div>
                    </div>
                    <div className="highlight" >
                        {
                            this.state.display.highlight.map((highlightField) => {
                                let field = this.state.highlight.filter(field => field.type === highlightField)[0]
                                return (
                                    <div className="highlight-field" key={field.type}>
                                        <i className={"highlight-field-c1 fa fa-" + field.type}></i>
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
                {this.props.referrer === 'home' ? null : (
                    <div className="dl-bar">
                        <Pdf targetRef={this.target} filename="div-blue.pdf" options={this.options} x={0} y={0} scale={0.82}>
                            {({ toPdf }) => (
                                <Button className="dl-button" onClick={toPdf}>Generate pdf</Button>
                            )}
                        </Pdf>
                    </div>
                )}
            </>
        )
    }
}

export default Resume