import React, { useEffect, useState } from "react"
import { TweenMax, TimelineMax, Quad } from "gsap"
import { GoogleLogin } from "react-google-login"
import { useHistory } from "react-router-dom"
import socketIOClient from "socket.io-client";
import axios from "axios"
import { setUser } from '../Components/utils'
import image from '../logowt.svg'
import '../css/login.css'
import igoogle from '../google.png'
import hmm from '../hmm.png'
import user from '../user.svg'

function Login() {
    const [id, setId] = useState(null),
        [pwd, setPwd] = useState(null),
        [loading, setLoading] = useState(false),
        [rememberMe, setRemember] = useState(false)
    let history = useHistory()
    const api = process.env.REACT_APP_API + '/api/user'
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                id: String(id).toLowerCase().trim(),
                pwd: String(pwd).trim(),
                rememberMe: rememberMe
            })
        }
        axios(api + '/login', options).then((res) => {
            setLoading(false)
            setUser(res.data)
            history.replace('/Dashboard')
        }).catch(err => {
            console.log(err.response)
            let errorSrc = err.response.data.code
            if (errorSrc === -1) {
                document.getElementById('id').classList.add("shake")
                setLoading(false)
                setTimeout(() => { document.getElementById('id').classList.remove("shake"); setLoading(false) }, 1000)
            }
            if (errorSrc === -2) {
                document.getElementById('pwd').classList.add("shake")
                setLoading(false)
                setTimeout(() => { document.getElementById('pwd').classList.remove("shake"); setLoading(false) }, 1000)
            }
            setLoading(false)
        })

    }
    const handleLogin = async gData => {
        setLoading(true)
        axios.get(api + '/gAuth', { params: { accessToken: gData.tokenId } }).then((res => {
            localStorage.setItem("google",true)
            setUser(res.data)
            setLoading(false)
            console.log(res)
            history.replace('/Dashboard')
        })).catch(err => localStorage.removeItem("user"))
    }
    const handleFailure = gData => {
        document.getElementsByClassName('googleLogin')[0].classList.add("shake")
        setLoading(false)
        setTimeout(() => { document.getElementsByClassName('googleLogin')[0].classList.remove("shake"); setLoading(false) }, 1000)
    }
    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="field s1">
                    <input pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$' oninvalid="setCustomValidity('Enter a valid Email ID')" onChange={e => setId(e.target.value)} className="logInp" type="text" autoComplete="email" required id="id" />
                    <span>Email ID</span>
                </div>
                <div className="field s1">
                    <input onChange={e => setPwd(e.target.value)} oninvalid="setCustomValidity('Please enter a Password')" className="logInp" type="password" autoComplete="new-password" required id="pwd" />
                    <span>Password</span>
                </div>
                <div className="field">
                    <button className="logSub" disabled={loading} type="submit">Submit</button>
                </div>
                <div className="field2 s1">
                    <input onChange={(e) => setRemember(e.target.value)} className="radioLog" type="checkbox" id="rememberCheck" />
                    <label htmlFor="rememberCheck" id="checkF">Remember Me</label>
                </div>
                <div className="field2">
                    <div className="divider"></div>
                    <div className="orTxt">OR</div>
                </div>
                <div className="field">
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        render={props =>
                            <button className="googleLogin" disabled={loading} onClick={props.onClick} type="button"><img className="igoogle" src={igoogle} /> Sign in with Google</button>
                        }
                    />
                </div>
            </form>
        </>
    )
}

function Register() {
    let [id, setId] = useState(null),
        [pwd, setPwd] = useState(null),
        [fname, setFname] = useState(null),
        [lname, setLname] = useState(null),
        [loading, setLoading] = useState(false),
        [isOTP, setisOTP] = useState(false),
        [OTP, setOTP] = useState(null),
        [timeLeft, setTime] = useState(null),
        [t, setT] = useState(null)
    let history = useHistory()
    const api = process.env.REACT_APP_API + '/api/user'
    const handleOTPSubmit = async e => {
        e.preventDefault()
        clearInterval(t)
        setLoading(true)
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                id: String(id).toLowerCase().trim(),
                pwd: String(pwd).trim(),
                fname: String(fname).trim(),
                lname: String(lname).trim(),
                otp: String(OTP).trim(),
            })
        }
        axios(api + '/register', options)
            .then(res => {
                setUser(res.data)
                setLoading(false)
                console.log(res)
                history.replace('/Dashboard')
            })
            .catch(err => {
                console.log(err.message)
                setLoading(false)
                // alert('Invalid OTP')
                // setLoading(false)
                // history.go(0)
            })

        // Enable Loading Animation
    }
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                id: String(id).toLowerCase().trim(),
                pwd: String(pwd).trim(),
                fname: String(fname).trim(),
                lname: String(lname).trim()
            })
        }
        axios(api + '/valid', options)
            .then(res => {
                if (res.data.code === 402) {
                    document.getElementById('id').classList.add("shake")
                    setTimeout(() => { document.getElementById('id').classList.remove("shake"); setLoading(false) }, 1000)
                }
                else {
                    let col = document.getElementsByClassName("s1")
                    let col2 = document.getElementsByClassName("linetext")
                    let switcher = document.getElementsByClassName("switcher")[0]
                    let bar2 = document.getElementsByClassName("bar2")[0]
                    let bar = document.getElementsByClassName("bar1")[0]
                    new Promise((resolve, reject) => {
                        switcher.classList.add("begone")
                        bar2.classList.add("begone2")
                        for (let i = 0; i < col2.length; i++) {
                            col2[i].style.display = 'none'
                        }
                        setTimeout(() => {
                            bar.classList.add("besmall");
                        }, 450)
                        setTimeout(() => {
                            for (let i = 0; i < col.length; i++) {
                                col[i].classList.add("swipeOut")
                            }
                            setisOTP(true); resolve();
                        }, 650)
                    }).then(() => {
                        let hero = document.getElementsByClassName("s2")
                        for (let i = 0; i < col.length; i++) {
                            hero[i].classList.add("fadeIn")
                        }
                        document.getElementsByClassName("otptext")[0].classList.add("fadeIn")
                        document.getElementsByClassName("userLog")[0].classList.add("fadeIn")
                        document.getElementById("otp").classList.add("fadeIn")
                        
                        setLoading(false)
                    }).then(() => {
                        let fut = res.data.timestamp
                        let curr = new Date().getTime()
                        let diff = Math.floor((fut - curr) / 1000)

                        setT(setInterval(() => {
                            diff -= 1
                            if (diff <= 0) {
                                alert('Please try again')
                                clearInterval(t)
                                history.go(0)
                            }
                            let min = ("" + Math.floor(diff / 60)).padStart(2, "0")
                            let sec = ("" + diff % 60).padStart(2, "0");
                            setTime(`${min}:${sec}`)
                        }, 1000))
                    })
                }
            })
            .catch(err => console.log(err.message))
    }
    useEffect(() => {
        let socket = socketIOClient(process.env.REACT_APP_API)
        socket.once("onVerification", (data) => {
            console.log(id,data)
            if(id === data.id && data.verification) {
                let options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify({
                        id: String(id).toLowerCase().trim(),
                        pwd: String(pwd).trim(),
                        rememberMe: false
                    })
                }
                axios(api + '/login', options).then((res) => {
                    console.log(res.data)
                    setUser(res.data)
                    setLoading(false)
                    history.replace('/Dashboard')
                })
            }
        })
    })
    const doc1 = (
        <>
            <div className="field s1">
                <input pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\.*[a-z]{0,4}$' oninvalid="setCustomValidity('Enter a valid Email ID')" onChange={e => setId(e.target.value)} className="logInp" type="text" autoComplete="email" required id="id" />
                <span>Email ID</span>
            </div>
            <div className="field s1">
                <input onChange={e => setFname(e.target.value)} oninvalid="setCustomValidity('Please enter valid First Name')" className="logInp" type="text" autoComplete="given-name" required id="fname" />
                <span>First Name</span>
            </div>
            <div className="field s1">
                <input onChange={e => setLname(e.target.value)} oninvalid="setCustomValidity('Please enter valid Last Name')" className="logInp" type="text" autoComplete="family-name" required id="lname" />
                <span>Last Name</span>
            </div>
            <div className="field s1">
                <input onChange={e => setPwd(e.target.value)} oninvalid="setCustomValidity('Please enter a Password')" className="logInp" type="password" autoComplete="new-password" required id="pwd" />
                <span>Password</span>
            </div>
            <div className="field s1">
                <input oninvalid="setCustomValidity('Please accept the T&C')" className="radioLog" type="checkbox" required id="radioCheck" />
                <label htmlFor="radioCheck" id="radioF">I agree to <a href="/tnc.html" target="_blank" download="tnc.html">&nbsp;T&C&nbsp;</a> of Pop Resume</label>
            </div>
        </>
    )
    const doc2 = (
        <>
            <div className="field4me s2">
                <img src={user} alt="user" className="userLog" />
                <div className="otptext">sent to {id}</div>
            </div>
            <div className="field s2">
                <input onChange={e => setOTP(e.target.value)} disabled={loading} className="logInp" type="text" inputMode="numeric" maxLength='6' required id="otp"/>
                <span>{timeLeft}</span>
            </div>
        </>
    )
    return (
        <>
            <form onSubmit={e => isOTP ? handleOTPSubmit(e) : handleSubmit(e)}>
                {isOTP ? doc2 : doc1}
                <div className="field">
                    <button className="logSub" disabled={loading} type="submit">{isOTP ? 'Confirm' : 'Submit'}</button>
                </div>
            </form>
        </>
    )
}

function Sample1() {
    return (
        <>
            <div className="line1">
                <svg width="100%" height="100%" viewBox="0 0 342 1785" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsSerif="http://www.serif.com/" className="dashedPath l1" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinecap: 'round', strokeLineJoin: 'round', strokeMiterLimit: 1.5 }}>
                    <g transform="matrix(1,0,0,1,-14772,-1578)">
                        <g transform="matrix(4.66479,0,0,3.75508,5633.34,0)">
                            <g transform="matrix(0.214372,0,0,0.266306,-1207.63,0)">
                                <path d="M14887,1588.6C14887,1588.6 14762.6,1877.21 14842.6,2019.43C14922.6,2161.66 15150.9,2268.68 15071.3,2450.72C15048.5,2491.68 14981.5,2476.24 14981.5,2428.52C14981.5,2380.8 15024,2377.46 15041.7,2382.71C15059.3,2387.96 15169.7,2443.26 15043.8,2677.44C14919.2,2858.03 14812.5,2906.32 14866.2,3090.08C14887,3161.31 14913,3225.88 14900.1,3261.51C14883.4,3307.32 14819.7,3313.66 14782.6,3313.28L14822.5,3258.12L14782.6,3313.28L14841.1,3352.57" style={{ fill: 'none', stroke: 'white', strokeWidth: '20.83px' }} />
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="t1l1 linetext">We Support Google Login :)</div>
            </div>
            <div className="line2">
                <svg width="100%" height="100%" viewBox="0 0 866 887" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsSerif="http://www.serif.com/" className="dashedPath l2" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinecap: 'round', strokeLineJoin: 'round', strokeMiterLimit: 1.5 }}>
                    <g transform="matrix(1,0,0,1,-14892,-2625)">
                        <g transform="matrix(4.66479,0,0,3.75508,5633.34,0)">
                            <g transform="matrix(0.214372,0,0,0.266306,-1207.63,0)">
                                <path d="M15674,2778.07C15674,2778.07 15546,2632.29 15467.7,2635.84C15389.5,2639.4 15798.4,3183.4 15741.5,3279.4C15684.6,3375.4 15368.2,2955.84 15279.3,2987.84C15190.4,3019.84 15528.2,3432.14 15432.2,3449.99C15336.2,3467.84 15158.8,3178.95 15103.5,3218.51C15048.2,3258.07 15201.1,3478.51 15147.7,3499.84C15114.9,3512.97 15071,3430.26 15016.5,3411.22C14982.5,3399.32 14943.4,3435.91 14903.1,3463.41C14954.2,3466.35 14972.8,3471.57 14972.8,3471.57L14903.1,3463.41L14911.7,3396.26" style={{ fill: 'none', stroke: 'white', strokeWidth: '20.83px' }} />
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="t2l2 linetext">Here's the<br />Register button</div>
            </div>
        </>
    )
}

function Sample2() {
    return (
        <>
            <div className="line3">
                <svg width="100%" height="100%" viewBox="0 0 767 476" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsSerif="http://www.serif.com/" className="dashedPath l3" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinecap: 'round', strokeLineJoin: 'round', strokeMiterLimit: 1.5 }}>
                    <g transform="matrix(1,0,0,1,-14791,-6076)">
                        <g transform="matrix(4.66479,0,0,3.75508,5633.34,5211.65)">
                            <g transform="matrix(0.214372,0,0,0.266306,-1207.63,-1387.89)">
                                <path d="M15280.6,6544.94C15280.6,6544.94 15595.2,6415.94 15545.8,6329.57C15459,6177.88 14797.3,6112.58 14797.3,6112.58L14840.5,6153.91L14797.3,6112.58L14849.8,6082.76" style={{ fill: 'none', stroke: 'white', strokeWidth: '20.83px' }} />
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="t3l3 linetext">For Google login go back</div>
            </div>
            <div className="linetext t4" contentEditable={true}>Leave a message for us</div>
        </>
    )
}

class Resume extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            origin: (this.props.location.origin === undefined ? 0 : parseInt(this.props.location.origin))
        }
    }

    hehe = (e) => {
        let switcher = document.getElementsByClassName('switcher')[0]
        switcher.classList.add('begone')
        this.setState({ origin: !this.state.origin })
        setTimeout(() => {
            if (this.state.origin) {
                switcher.classList.remove('loginMode')
                switcher.classList.add('regMode')
            }
            else {
                switcher.classList.add('loginMode')
                switcher.classList.remove('regMode')
            }
            switcher.classList.remove('begone')
            switcher.classList.add('become')
        }, 200)
        setTimeout(() => {
            switcher.classList.remove('become')
        }, 700)
    }
    componentDidMount() {
        /**
         * Below has been referenced from: https://codepen.io/kdurber/pen/gzmqMQ?editors=0010
         */
        var switcher = document.getElementsByClassName('switcher')[0]
        if (this.state.origin) switcher.classList.add('regMode')
        else switcher.classList.add('loginMode')
        var c = document.getElementById('waves'),
            ctx = c.getContext('2d'),
            cw = c.width = window.innerWidth,
            ch = c.height = window.innerHeight,
            lines = [], gradient = ctx.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop("0", "#5B00D8");
        gradient.addColorStop("1.0", "#FF8DFF");
        class WibbleLine {
            constructor(ctx, num_points, width, vPos, anim_duration) {
                this.ctx = ctx;
                this.canvasWidth = width;
                this.vertBasis = vPos;
                this.points = [];
                this.peakMaxH = 40;
                this.peakMaxV = 100;
                this.animDuration = anim_duration;
                this.peaks = { va: this.peakMaxV, vb: -this.peakMaxV, ha: this.peakMaxH, hb: -this.peakMaxH };
                this.createLine(num_points);
                // this.drawLine();
                // this.anim();
            }
            // Create points to draw between
            createLine(num_points) {
                var gap = this.canvasWidth / num_points;
                for (var i = -2; i < num_points + 4; i++) {
                    this.points.push(i * gap);
                }
                // console.log(this.points);
            }
            // Draw line along defined points
            drawLine() {
                this.ctx.beginPath();
                this.ctx.moveTo(this.points[0], ch);
                this.ctx.strokeStyle = gradient;
                this.ctx.lineWidth = 1;
                this.ctx.fillStyle = '#5a00d812';
                // Draw curves
                for (var i = 1; i < this.points.length - 1; i += 4) {
                    // Curve up
                    this.ctx.quadraticCurveTo(
                        this.points[i], this.vertBasis + this.peaks.va,
                        this.points[i + 1], this.vertBasis);
                    // Curve down
                    this.ctx.quadraticCurveTo(
                        this.points[i + 2], this.vertBasis + this.peaks.vb,
                        this.points[i + 3], this.vertBasis);
                }
                this.ctx.lineTo(this.canvasWidth, this.vertBasis * 4);
                this.ctx.lineTo(0, this.vertBasis * 4);
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
        addLine(6, ch / 2, 8);
        addLine(4, (ch / 2) * 1.1, 11);
        // addLine(5, (ch / 2) * 1.2, 6);
        // addLine(4, (ch / 2) * 1.3, 7);
        // addLine(6, (ch / 2) * 1.4, 8);
        // addLine(4, (ch / 2) * 1.5, 9);
        // addLine(12, (ch / 2) * 1.6, 10);
        function addLine(segments, vy, anim) {
            var el1 = new WibbleLine(ctx, segments, cw, vy, anim);
            var tlv = new TimelineMax({ repeat: -1, yoyo: true });
            tlv.add(TweenMax.to(el1.peaks, anim, {
                va: -el1.peakMaxV,
                vb: el1.peakMaxV,
                ease: Quad.easeInOut
            }), 0);

            lines.push(el1);
        }
        function drawAllLines() {
            // console.log("draw All Lines");
            ctx.clearRect(0, 0, cw, ch);
            for (var i = 0; i < lines.length; i++) {
                lines[i].drawLine();
            }
        }
        var render = function () {
            window.requestAnimationFrame(render, c);
            drawAllLines();
        }
        window.requestAnimFrame = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) { window.setTimeout(a, 1E3 / 60) } }();
        render();
    }
    render() {
        return (
            <div className="logScreen">
                <canvas id="waves" />
                <div className="componentContainLog">
                    <div className="bar1">
                        <div className="switcher" onClick={(e) => { this.hehe(e) }}>
                            <img src={hmm} alt="hmm" className="hmm" />
                        </div>
                        <div className="loginLogo" draggable={false}>
                            <img src={image} alt="logo" />
                        </div>
                        <div className="containerLogin">
                            {this.state.origin ? <Register /> : <Login />}
                        </div>
                    </div>
                    <div className="bar2">
                        {this.state.origin ? Sample2() : Sample1()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Resume