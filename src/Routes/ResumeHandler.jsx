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
        <FormGroup onBlur={e => props.update(0, info)}>
            <div className="delete-row" onClick={e => { e.preventDefault(); props.delete(0, info.id) }}><i className="fa fa-trash" /></div>
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
        this.setStateArray = this.setStateArray.bind(this)
    }

    addRow(event, index) {
        event.preventDefault()
        let eventContainer = event.target.parentElement.nextElementSibling
        switch (index) {
            // Education
            case 0:
                this.setState({ education: this.state.education.concat({ ...dataStructure.education, id: uuidv4() }) })
                break
            // Organization
            case 1:
                break
            // Experience
            case 2:
                break
        }
    }

    deleteRow(type, value) {
        switch (type) {
            case 0:
                console.log(value)
                const doc = this.state.education.filter(itr => itr.id != value);
                this.setState({ education: doc })
                console.log(doc.filter(itr => itr.id === value), value)
                // localStorage.setItem("data", JSON.stringify(this.state))
                this.forceUpdate()
                break
            case 1:
                break
        }
    }

    setStateArray(type, value) {
        console.log(this.state.education)
        switch (type) {
            case 0:
                this.setState({ education: this.state.education.map(itr => (itr.id === value.id ? { ...value } : itr)) })
                localStorage.setItem("data", JSON.stringify(this.state))
                break
            case 1:
                break
        }
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
                                    <Accordion.Toggle as={Button} variant="" eventKey="0">
                                        <span className="component-title">Education</span>
                                    </Accordion.Toggle>
                                    <button className="add-component" onMouseDown={e => this.addRow(e, 0)}>+</button>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {this.state.education.map(item => <Education key={item.id} update={this.setStateArray} delete={this.deleteRow} info={item} />)}
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