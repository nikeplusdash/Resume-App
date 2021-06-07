import React, { useEffect, useRef, useState } from "react"
import { Link } from 'react-router-dom'
import { Accordion, Card, Button, FormControl, InputGroup, FormGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import '../css/handler.css'
import { dataStructure, dummyUserData } from '../Components/utils'
// import 'bootstrap/dist/css/bootstrap.min.css';

function Education(props) {
    let [info, setInfo] = useState(props.info)
    let tempRef = useRef()
    return (
        <FormGroup onBlur={e => props.update("education", info)}>
            <div className="delete-row" >
                <i className="fa fa1 fa-chevron-up" onClick={e => { e.preventDefault(); props.order("education", 0, info.id) }} />
                <i className="fa fa2 fa-trash" onClick={e => { e.preventDefault(); props.delete("education", info.id) }} />
                <i className="fa fa3 fa-chevron-down" onClick={e => { e.preventDefault(); props.order("education", 1, info.id) }} />
            </div>
            <InputGroup>
                <FormControl
                    placeholder="Institution Place"
                    aria-label="Institution Place"
                    aria-describedby="basic-addon1"
                    defaultValue={info.place}
                    onChange={e => {
                        setInfo({ ...info, place: e.target.value })
                    }}
                />
                <FormControl
                    placeholder="Study period From"
                    aria-label="Study from"
                    aria-describedby="basic-addon1"
                    defaultValue={info.from}
                    onChange={e => {
                        setInfo({ ...info, from: e.target.value })
                    }}
                />
                <FormControl
                    placeholder="To"
                    aria-label="Study period till"
                    aria-describedby="basic-addon1"
                    defaultValue={info.to}
                    ref={tempRef}
                    onChange={e => {
                        setInfo({ ...info, to: e.target.value })
                    }}
                />
                <Form.Label
                    aria-label="Check"
                />
                <Form.Check
                    type="checkbox"
                    label="Currently Studying?"
                    onChange={e => {
                        tempRef.current.disabled = e.target.checked
                        setInfo({ ...info, isCurrent: e.target.checked })
                    }}
                />
            </InputGroup>
            <InputGroup>
                <FormControl
                    placeholder="Description"
                    as="textarea"
                    aria-label="Institution Place"
                    aria-describedby="basic-addon1"
                    defaultValue={info.desc}
                    onChange={e => {
                        setInfo({ ...info, desc: e.target.value })
                    }}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <DropdownButton
                    variant="outline-secondary"
                    title="Grading Scheme"
                    id="input-group-dropdown-1"
                    onClick={e => setInfo({ ...info, scale: e.target.text })}
                >
                    <Dropdown.Item href="#">4-Point GPA</Dropdown.Item>
                    <Dropdown.Item href="#">5-Point GPA</Dropdown.Item>
                    <Dropdown.Item href="#">10-Point GPA</Dropdown.Item>
                    <Dropdown.Item href="#">GPA</Dropdown.Item>
                    <Dropdown.Item href="#">%</Dropdown.Item>
                </DropdownButton>
                <FormControl
                    placeholder="Enter your marks"
                    defaultValue={info.marks}
                    aria-label="Marks"
                    aria-describedby="basic-addon1"
                    onChange={e => {
                        setInfo({ ...info, marks: e.target.value })
                    }}
                />
            </InputGroup>
        </FormGroup>
    )
}

function Experience(props) {
    let [info, setInfo] = useState(props.info)
    let tempRef = useRef()
    return (
        <FormGroup onBlur={e => props.update("experience", info)}>
            <div className="delete-row" >
                <i className="fa fa1 fa-chevron-up" onClick={e => { e.preventDefault(); props.order("experience", 0, info.id) }} />
                <i className="fa fa2 fa-trash" onClick={e => { e.preventDefault(); props.delete("experience", info.id) }} />
                <i className="fa fa3 fa-chevron-down" onClick={e => { e.preventDefault(); props.order("experience", 1, info.id) }} />
            </div>
            <InputGroup>
                <FormControl
                    placeholder="Work Place"
                    aria-label="Work Place"
                    aria-describedby="basic-addon1"
                    defaultValue={info.place}
                    onChange={e => {
                        setInfo({ ...info, place: e.target.value })
                    }}
                />
                <FormControl
                    placeholder="Work period From"
                    aria-label="Work from"
                    aria-describedby="basic-addon1"
                    defaultValue={info.from}
                    onChange={e => {
                        setInfo({ ...info, from: e.target.value })
                    }}
                />
                <FormControl
                    placeholder="To"
                    aria-label="Work period till"
                    aria-describedby="basic-addon1"
                    defaultValue={info.to}
                    ref={tempRef}
                    onChange={e => {
                        setInfo({ ...info, to: e.target.value })
                    }}
                />
                <Form.Label
                    aria-label="Check"
                />
                <Form.Check
                    type="checkbox"
                    label="Currently Working?"
                    onChange={e => {
                        tempRef.current.disabled = e.target.checked
                        setInfo({ ...info, isCurrent: e.target.checked })
                    }}
                />
            </InputGroup>
            <InputGroup>
                <FormControl
                    placeholder="Description"
                    rows={4}
                    as="textarea"
                    aria-label="Work Place"
                    aria-describedby="basic-addon1"
                    defaultValue={info.desc}
                    onChange={e => {
                        setInfo({ ...info, desc: e.target.value })
                    }}
                />
            </InputGroup>
            <InputGroup className="mb-3">                
                <FormControl
                    placeholder="Enter your referals"
                    defaultValue={info.referal}
                    aria-label="Referal"
                    aria-describedby="basic-addon1"
                    onChange={e => {
                        setInfo({ ...info, referal: e.target.value })
                    }}
                />
            </InputGroup>
        </FormGroup>
    )
}

function Organization(props) {
    let [info, setInfo] = useState(props.info)
    let tempRef = useRef()
    return (
        <FormGroup onBlur={e => props.update("organization", info)}>
            <div className="delete-row" >
                <i className="fa fa1 fa-chevron-up" onClick={e => { e.preventDefault(); props.order("organization", 0, info.id) }} />
                <i className="fa fa2 fa-trash" onClick={e => { e.preventDefault(); props.delete("organization", info.id) }} />
                <i className="fa fa3 fa-chevron-down" onClick={e => { e.preventDefault(); props.order("organization", 1, info.id) }} />
            </div>
            <InputGroup>
                <FormControl
                    placeholder="Organization name"
                    aria-label="Organization name"
                    aria-describedby="basic-addon1"
                    defaultValue={info.name}
                    onChange={e => {
                        setInfo({ ...info, name: e.target.value })
                    }}
                />
                <FormControl
                    placeholder="Participated From"
                    aria-label="Participated from"
                    aria-describedby="basic-addon1"
                    defaultValue={info.from}
                    onChange={e => {
                        setInfo({ ...info, from: e.target.value })
                    }}
                />
                <FormControl
                    placeholder="To"
                    aria-label="Participated till"
                    aria-describedby="basic-addon1"
                    defaultValue={info.to}
                    ref={tempRef}
                    onChange={e => {
                        setInfo({ ...info, to: e.target.value })
                    }}
                />
                <Form.Label
                    aria-label="Check"
                />
                <Form.Check
                    type="checkbox"
                    label="Currently participating?"
                    onChange={e => {
                        tempRef.current.disabled = e.target.checked
                        setInfo({ ...info, isCurrent: e.target.checked })
                    }}
                />
            </InputGroup>
            <InputGroup>
                <FormControl
                    placeholder="Description"
                    as="textarea"
                    aria-label="Work Place"
                    aria-describedby="basic-addon1"
                    defaultValue={info.desc}
                    onChange={e => {
                        setInfo({ ...info, desc: e.target.value })
                    }}
                />
            </InputGroup>
        </FormGroup>
    )
}

function Languages(props) {
    let [info, setInfo] = useState(props.info)
    let tempRef = useRef()
    return (
        <FormGroup onBlur={e => props.update("languages", info)}>
            <InputGroup>
                <FormControl
                    placeholder="Language name"
                    aria-label="Language name"
                    aria-describedby="basic-addon1"
                    defaultValue={info.name}
                    onChange={e => {
                        setInfo({ ...info, name: e.target.value })
                    }}
                />
                <FormControl
                    placeholder="Proficiency"
                    aria-label="Proficiency"
                    aria-describedby="basic-addon1"
                    defaultValue={info.proficiency}
                    onChange={e => {
                        setInfo({ ...info, proficiency: e.target.value })
                    }}
                />
                <div className="delete-row row-line" >
                    <i className="fa fa1 fa-chevron-up" onClick={e => { e.preventDefault(); props.order("languages", 0, info.id) }} />
                    <i className="fa fa2 fa-trash" onClick={e => { e.preventDefault(); props.delete("languages", info.id) }} />
                    <i className="fa fa3 fa-chevron-down" onClick={e => { e.preventDefault(); props.order("languages", 1, info.id) }} />
                </div>
            </InputGroup>
        </FormGroup>
    )
}

function Skills(props) {
    let [info, setInfo] = useState(props.info)
    let tempRef = useRef()
    return (
        <FormGroup onBlur={e => props.update("skills", info)}>
            <InputGroup>
                <FormControl
                    placeholder="Enter skill"
                    aria-label="Enter skill"
                    aria-describedby="basic-addon1"
                    defaultValue={info.name}
                    onChange={e => {
                        setInfo({ ...info, name: e.target.value })
                    }}
                />
                <div className="delete-row row-line" >
                    <i className="fa fa1 fa-chevron-up" onClick={e => { e.preventDefault(); props.order("skills", 0, info.id) }} />
                    <i className="fa fa2 fa-trash" onClick={e => { e.preventDefault(); props.delete("skills", info.id) }} />
                    <i className="fa fa3 fa-chevron-down" onClick={e => { e.preventDefault(); props.order("skills", 1, info.id) }} />
                </div>
            </InputGroup>
        </FormGroup>
    )
}

function Interests(props) {
    let [info, setInfo] = useState(props.info)
    let tempRef = useRef()
    return (
        <FormGroup onBlur={e => props.update("interests", info)}>
            <InputGroup>
                <FormControl
                    placeholder="Enter interests"
                    aria-label="Enter interests"
                    aria-describedby="basic-addon1"
                    defaultValue={info.name}
                    onChange={e => {
                        setInfo({ ...info, name: e.target.value })
                    }}
                />
                <div className="delete-row row-line" >
                    <i className="fa fa1 fa-chevron-up" onClick={e => { e.preventDefault(); props.order("interests", 0, info.id) }} />
                    <i className="fa fa2 fa-trash" onClick={e => { e.preventDefault(); props.delete("interests", info.id) }} />
                    <i className="fa fa3 fa-chevron-down" onClick={e => { e.preventDefault(); props.order("interests", 1, info.id) }} />
                </div>
            </InputGroup>
        </FormGroup>
    )
}

class ResumeHandler extends React.Component {
    constructor(props) {
        super(props)
        // let userdata = JSON.parse(localStorage.getItem("data"))
        let userdata = dummyUserData
        this.state = {
            ...userdata,
            loading: false,
        }
        this.addRow = this.addRow.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
        this.moveUpDown = this.moveUpDown.bind(this)
        this.setStateArray = this.setStateArray.bind(this)
    }

    addRow(event, index) {
        event.preventDefault()
        this.setState({ [index]: this.state[index].concat({ ...dataStructure[index], id: uuidv4() }) })
    }

    deleteRow(type, value) {
        const doc = this.state[type].filter(itr => itr.id !== value);
        this.setState({ [type]: doc })
    }

    setStateArray(type, value) {
        console.log(this.state)
        this.setState({ [type]: this.state[type].map(itr => (itr.id === value.id ? { ...value } : itr)) })
        // localStorage.setItem("data", JSON.stringify(this.state))
    }

    moveUpDown(type, direction, value) {
        let index = this.state[type].findIndex(itr => itr.id === value), swapIndex = direction ? index + 1 : index - 1
        if (direction === 0 && swapIndex === -1) return
        if (direction === 1 && swapIndex === this.state[type].length) return

        let data = [...this.state[type]];
        let temp = data[swapIndex];
        data[swapIndex] = data[index];
        data[index] = temp;

        this.setState({ [type]: data })
    }

    render() {
        return (
            <>
                <div className="nav">
                    <Link to={{ pathname: '/logout' }}><div className="wrap-nobg"><div className="i1">Logout</div></div></Link>
                </div>
                <div className="form-resume-container">
                    <Accordion>
                        <form className="form-resume" onSubmit={e => e.preventDefault()}>
                        <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="" eventKey="20">
                                        <span className="component-title">Basic Information</span>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="20">
                                    <Card.Body>
                                        <FormGroup>
                                            <InputGroup>
                                                <FormControl
                                                    placeholder="Name"
                                                    aria-label="Name"
                                                    defaultValue={this.state.name}
                                                    onChange={e => {
                                                        this.setState({ name: e.target.value })
                                                    }}
                                                />
                                                <FormControl
                                                    placeholder="Designation"
                                                    aria-label="Designation"
                                                    defaultValue={this.state.current}
                                                    onChange={e => {
                                                        this.setState({ current: e.target.value })
                                                    }}
                                                />
                                            </InputGroup>
                                            <InputGroup>
                                                <FormControl
                                                    placeholder="A few lines about yourself"
                                                    rows={4}
                                                    as="textarea"
                                                    aria-label="Description"
                                                    defaultValue={this.state.description}
                                                    onChange={e => {
                                                        this.setState({ description: e.target.value })
                                                    }}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="" eventKey="0">
                                        <span className="component-title">Education</span>
                                    </Accordion.Toggle>
                                    <button className="add-component" onMouseDown={e => this.addRow(e, "education")}>+</button>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {this.state.education.map(item => <Education key={item.id} update={this.setStateArray} delete={this.deleteRow} order={this.moveUpDown} info={item} />)}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="" eventKey="1">
                                        <span className="component-title">Experience</span>
                                    </Accordion.Toggle>
                                    <button className="add-component" onMouseDown={e => this.addRow(e, "experience")}>+</button>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        {this.state.experience.map(item => <Experience key={item.id} update={this.setStateArray} delete={this.deleteRow} order={this.moveUpDown} info={item} />)}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="" eventKey="2">
                                        <span className="component-title">Organizations</span>
                                    </Accordion.Toggle>
                                    <button className="add-component" onMouseDown={e => this.addRow(e, "organization")}>+</button>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        {this.state.organization.map(item => <Organization key={item.id} update={this.setStateArray} delete={this.deleteRow} order={this.moveUpDown} info={item} />)}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="" eventKey="3">
                                        <span className="component-title">Languages</span>
                                    </Accordion.Toggle>
                                    <button className="add-component" onMouseDown={e => this.addRow(e, "languages")}>+</button>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                        {this.state.languages.map(item => <Languages key={item.id} update={this.setStateArray} delete={this.deleteRow} order={this.moveUpDown} info={item} />)}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="" eventKey="4">
                                        <span className="component-title">Skills</span>
                                    </Accordion.Toggle>
                                    <button className="add-component" onMouseDown={e => this.addRow(e, "skills")}>+</button>
                                </Card.Header>
                                <Accordion.Collapse eventKey="4">
                                    <Card.Body>
                                        {this.state.skills.map(item => <Skills key={item.id} update={this.setStateArray} delete={this.deleteRow} order={this.moveUpDown} info={item} />)}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="" eventKey="5">
                                        <span className="component-title">Interests</span>
                                    </Accordion.Toggle>
                                    <button className="add-component" onMouseDown={e => this.addRow(e, "interests")}>+</button>
                                </Card.Header>
                                <Accordion.Collapse eventKey="5">
                                    <Card.Body>
                                        {this.state.interests.map(item => <Interests key={item.id} update={this.setStateArray} delete={this.deleteRow} order={this.moveUpDown} info={item} />)}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </form>
                    </Accordion>
                </div>
            </>
        )
    }
}

export default ResumeHandler