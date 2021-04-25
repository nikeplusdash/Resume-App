import React from "react"
import { DesignPalette } from './utils'
import '../css/themebar.css'

class ThemeBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: props.init
        }
        this.theme = this.theme.bind(this)
    }
    divClick = (e, i) => {
        if(this.props.loading) return
        let neo_list = document.getElementsByClassName('after')
        this.setState({ theme: e.target.getAttribute('data-key') })
        try {
            for (let i = 0; i < neo_list.length; i++) {
                neo_list[i].classList.add('color')
                neo_list[i].classList.remove('after')
            }
        }
        catch { console.error("Some Error lol") }
        e.target.classList.toggle('color')
        e.target.classList.add('after')
        this.props.setState(e.target.getAttribute('data-key'))
    }
    theme() {
        let coll = []
        for (let i = 1; i < 4; i++) {
            coll.push(
                <div className="theme" key={i + ""}>
                    <div className={this.state.theme === i ? 'after c' + (i) : ('color c' + (i))} style={{ background: DesignPalette[i].backgroundGradientCSS }} data-key={i} onClick={this.divClick} />
                    <div className={'txt t' + (i)} style={{ color: DesignPalette[i].fontColor }}>{DesignPalette[i].name}</div>
                </div>
            )
        }
        return coll
    }
    render() {
        return (
            <div className="control">{this.theme()}</div>
        )
    }
}

export default ThemeBar