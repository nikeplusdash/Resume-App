import React from "react"
import '../css/custom.css'

class Custom extends React.Component {
    componentDidMount() {
        let cursor = document.getElementById('cursor')
        let move = false
        if (this.props.enableScroll) {
            let position = [0, 0]
            let sPosition = [0, 0]
            document.addEventListener("mousemove", e => {
                cursor.classList.add("ismoving")
                if (move) {
                    let currPosition = [e.clientX, e.clientY]
                    let diff = [-(currPosition[0] - position[0]), -(currPosition[1] - position[1])]
                    window.scrollBy({ top: (document.body.offsetTop + diff[1]) / 5 })
                }
                sPosition = [e.clientX, e.clientY]
                cursor.style.left = e.pageX + 'px'
                cursor.style.top = e.pageY + 'px'
            })
            document.addEventListener("mouseup", () => { move = false })
            document.addEventListener("mousedown", (e) => { move = true; position = [e.clientX, e.clientY]; })
            document.addEventListener("scroll", e => {
                cursor.style.top = window.pageYOffset + parseInt(sPosition[1]) + 'px'
            })
            clearTimeout(timer)
            var timer = setTimeout(() => {
                cursor.classList.remove('ismoving')
            }, 300)
        }
        if (!this.props.enableScroll) {
            let sPosition = [0, 0]
            document.addEventListener("mousemove", e => {
                cursor.style.left = e.pageX + 'px'
                cursor.style.top = e.pageY + 'px'
                sPosition = [e.clientX, e.clientY]
            })
            document.addEventListener("scroll", e => {
                cursor.style.top = window.pageYOffset + parseInt(sPosition[1]) + 'px'
            })
        }
    }
    render() {
        return (
            <div id="cursor"></div>
        )
    }
}

export default Custom