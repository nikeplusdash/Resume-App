import React, { createRef } from "react"
import { DesignPalette, dummyUserData } from './utils'
import Pdf from "react-to-pdf";
import convert from 'color-convert'
import { Button, ProgressBar } from 'react-bootstrap'
import '../css/resume.css'
import 'font-awesome/css/font-awesome.min.css';
import ThemeBar from "./ThemeBar";

class Resume extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.referrer)
        this.state = { ...((props.referrer === 'home') ? dummyUserData : props.location.referrer === 'handler'? props.location.data : dummyUserData), theme: 2 }
        this.generateChildren = this.generateChildren.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.target = createRef()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.themeVal !== this.props.themeVal) {
            this.handleChange(this.props.themeVal)
            this.setState({ theme: this.props.themeVal });
        }
        else this.handleChange(this.state.theme)
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

    handleChange(theme) {
        switch (theme) {
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

    square = x => x * x
    distance = (x, y) => Math.sqrt(this.square(x[0] - y[0]) + this.square(x[1] - y[1]) + this.square(x[2] - y[2]))
    transition = (theme) => {
        if (this.state.theme === theme || this.state.loading) { return; }
        this.setState({ loading: true })
        let [a, b] = document.getElementsByTagName('stop')
        let color1 = DesignPalette[this.state.theme], color2 = DesignPalette[theme]
        let rgb1I = convert.hex.rgb(color1.startColor), rgb1F = convert.hex.rgb(color2.startColor)
        let rgb2I = convert.hex.rgb(color1.endColor), rgb2F = convert.hex.rgb(color2.endColor)
        let fixedItr = 5000
        let m1 = [rgb1F[0] - rgb1I[0], rgb1F[1] - rgb1I[1], rgb1F[2] - rgb1I[2]], m2 = [rgb2F[0] - rgb2I[0], rgb2F[1] - rgb2I[1], rgb2F[2] - rgb2I[2]]
        let x1 = this.distance(rgb1F, rgb1I) / fixedItr
        let x2 = this.distance(rgb2F, rgb2I) / fixedItr
        let y1 = rgb1I, y2 = rgb2I
        let d1 = x1, d2 = x2, dd1 = 6, dd2 = 6
        a.style.stopColor = `rgb(${y1[0]},${y1[1]},${y1[2]})`
        b.style.stopColor = `rgb(${y2[0]},${y2[1]},${y2[2]})`
        new Promise((res, rej) => {
            let t = setInterval(() => {
                dd1 = this.distance(rgb1F, y1)
                dd2 = this.distance(rgb2F, y2)
                if (dd1 > 10) y1 = [Math.round(m1[0] * x1 + rgb1I[0]), Math.round(m1[1] * x1 + rgb1I[1]), Math.round(m1[2] * x1 + rgb1I[2])]
                if (dd2 > 10) y2 = [Math.round(m2[0] * x2 + rgb2I[0]), Math.round(m2[1] * x2 + rgb2I[1]), Math.round(m2[2] * x2 + rgb2I[2])]
                if (dd1 <= 10 && dd2 <= 10) { clearInterval(t); res(theme); }
                x1 += d1
                x2 += d2
                a.style.stopColor = `rgb(${y1[0]},${y1[1]},${y1[2]})`
                b.style.stopColor = `rgb(${y2[0]},${y2[1]},${y2[2]})`
            }, 20)
        }).then(th => {
            this.setState({ loading: false, theme: th })
        })
    }
    display = () => {
        let displayTheme = DesignPalette[this.state.theme]
        return ([<stop offset="0" style={{ stopColor: displayTheme.startColor, stopOpacity: 0.9 }} />, <stop offset="1" style={{ stopColor: displayTheme.endColor, stopOpacity: 0.9 }} />])
    }

    render() {
        return (
            <>
                <div className="center-text">
                    <ThemeBar loading={this.state.loading} init={this.state.theme} setState={theme => this.transition(theme)} />
                </div>
                <div className="resume" style={{ marginTop: (this.props.referrer === 'home' ? "-35%" : "10%") }} ref={this.target}>
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
                            this.state.highlight !== undefined?
                            this.state.highlight.map((field) => {
                                return (
                                    <div className="highlight-field" key={field.type}>
                                        <div className={"highlight-field-c1 fa fa-" + field.type}></div>
                                        <div className="highlight-field-c2">{field.data}</div>
                                    </div>
                                )
                            }):null
                        }
                    </div>
                    <div className="details-container">
                        {
                            this.state.display.map((infoField) => {
                                let infoDetails = this.state[infoField]
                                return this.generateChildren(infoField, infoDetails)
                            })
                        }
                    </div>
                </div>
                {this.props.referrer === 'home' ? null : (
                    <ThemeBar loading={this.state.loading} init={this.state.theme} setState={theme => this.setState({ theme: theme })} />
                )}
                {this.props.referrer === 'home' ? null : (
                    <div className="dl-bar">
                        <Pdf targetRef={this.target} filename={this.state.name+"'s Resume.pdf"} options={this.options} x={0} y={0} scale={0.82}>
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