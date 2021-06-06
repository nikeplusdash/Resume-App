import React from "react"
import { Link } from 'react-router-dom'
import image from '../logowt.svg'
import { DesignPalette } from '../Components/utils'
import convert from 'color-convert'
import ThemeBar from '../Components/ThemeBar'
import Resume from '../Components/Resume'
import '../css/home.css'
import Custom from "../Components/Custom"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 2,
            loading: false
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
        let doc = (
            <div className="container">
                <div className="nav">
                    <Link to={{ pathname: '/login', origin: '1' }}><div className="wrap-bg"><div className="i2">Register</div></div></Link>
                    <Link to={{ pathname: '/login', origin: '0' }}><div className="wrap-nobg"><div className="i1">Login</div></div></Link>
                </div>
                <div className="logo-img" draggable={false}>
                    <img src={image} alt="logo" />
                </div>
                <div className="joint">
                    <div className="text-j" onClick={() => window.scrollBy({ top: window.innerHeight / 1.5, behavior: 'smooth' })} style={{ color: DesignPalette[this.state.theme].specialFontColor }}>Try it out</div>
                    <div className="circleBG">
                        <svg className="svgImg" width="100%" height="100%" viewBox="0 0 9684 4907" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLineJoin: 'round', strokeMiterLimit: 2 }}><path d="M1903.89,1554.85c-168.8,-76.041 -356.052,-118.204 -553.077,-118.204c-745.51,-0 -1350.77,605.259 -1350.77,1350.77c-0,745.509 605.258,1350.77 1350.77,1350.77c448.675,0 846.456,-219.386 1092.17,-556.498c72.022,-98.814 181.903,-163.216 303.309,-177.773c121.407,-14.557 243.398,22.044 336.739,101.03c346.621,293.316 795.192,470.197 1284.86,470.197c424.117,-0 817.424,-132.638 1140.35,-358.865c108.299,-75.869 244.969,-99.032 372.22,-63.083c127.25,35.948 231.598,127.199 284.191,248.521c281.797,650.053 930.189,1105.29 1684.3,1105.29c1012.32,0 1834.35,-820.38 1834.35,-1831.05c0,-1010.67 -822.031,-1831.05 -1834.35,-1831.05c-355.122,-0 -686.828,100.856 -967.644,275.742c-112.273,69.922 -250.038,85.65 -375.182,42.833c-125.144,-42.816 -224.401,-139.638 -270.313,-263.681c-280.669,-758.306 -1011.45,-1299.45 -1867.92,-1299.45c-858.555,0 -1590.82,543.757 -1869.95,1304.74c-42.088,114.742 -129.988,206.82 -242.653,254.187c-112.666,47.367 -239.953,45.759 -351.386,-4.44l0,0Z" style={{ fill: 'url(#_Linear1)' }} /><defs>
                            <linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(9683.25,0,0,4906.64,0.044608,2453.68)">
                                {this.display()}
                            </linearGradient></defs>
                        </svg>
                    </div>
                    <ThemeBar loading={this.state.loading} init={this.state.theme} setState={theme => this.transition(theme)} />
                    <Resume referrer={'home'} themeVal={this.state.theme} />
                </div>
                <div className="bottomDeets">
                    <div className="headline-bD">
                        <div className="mainTxt-bd">And in<br />just<br /> 3 steps</div>
                        <Link to={{ pathname:'/login', origin: '1' }}><input type="button" value="Create your own" className="btn-bD" /></Link>
                    </div>
                    <div className="design-bD">
                        <div className="boxDb oneH-bD">
                            <div id="oneH" className="headTxt">1</div>
                            <div className="subDesc">Register & Login</div>
                        </div>
                        <div className="boxDb twoH-bD">
                            <div id="twoH" className="headTxt">2</div>
                            <div className="subDesc">Upload & Fill</div>
                        </div>
                        <div className="boxDb three-bD">
                            <div id="threeH" className="headTxt">3</div>
                            <div className="subDesc">Download</div>
                        </div>
                    </div>
                </div>
                <div className="footLogo">Developed with
                 <svg className="footImg" width="100%" height="100%" viewBox="0 0 144 125" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLineJoin: "round", strokeMiterLimit: 2 }}><path d="M72.081,21.502c15.025,-25.669 45.075,-25.669 60.101,-12.834c15.026,12.834 15.026,38.504 -0,64.174c-10.518,19.252 -37.563,38.504 -60.101,51.339c-22.538,-12.835 -49.584,-32.087 -60.102,-51.339c-15.025,-25.67 -15.025,-51.34 0,-64.174c15.026,-12.835 45.076,-12.835 60.102,12.834Z" style={{ fill: "#b20021" }} /></svg>
                 by <div className="footText">ANS</div></div>
            </div>
        )
        return (
            <div>
                <Custom enableScroll={false} document={doc} />
            </div>
        )
    }
}

export default Home