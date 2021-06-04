import React from "react"
import axios from "axios"
import "../css/dashboard.css"
import { getUser } from "../Components/utils"

class Highlight extends React.Component {
    render() {
        return(
            <>
            </>
        )
    }
}

class List extends React.Component {
    render() {
        return(
            <>
            </>
        )
    }
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: {},
            list: {}
        }
    }
    componentDidMount() {
        let api = process.env.REACT_APP_API + '/api/data'
        let options = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': getUser().accessToken,
                'G-Auth': localStorage.getItem("google")
            }
        }
        axios(api + '/dashboard', options).then((res) => {
            console.log(res)
        })
    }
    render() {
        return (
            <>
                <Highlight />
                <List />
            </>
        )
    }
}

export default Dashboard