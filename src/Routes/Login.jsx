import React, { useState } from "react"
import { TweenMax, TimelineMax, Quad } from "gsap"
import axios from "axios"
import image from '../logowt.svg'
import '../css/login.css'
import hmm from '../hmm.png'

function Login() {
    const [id, setId] = useState(null),
        [pwd, setPwd] = useState(null),
        [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let api = process.env.REACT_APP_API
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                id: String(id).toLowerCase().trim(),
                pwd: String(pwd).trim(),
            })
        }
        // axios(api + '/api/login', options)

    }
    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="field s1">
                    <input pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' oninvalid="setCustomValidity('Enter a valid Email ID')" onChange={e => setId(e.target.value)} className="logInp" type="text" autoComplete="email" required id="id" />
                    <span>Email ID</span>
                </div>
                <div className="field s1">
                    <input onChange={e => setPwd(e.target.value)} oninvalid="setCustomValidity('Please enter a Password')" className="logInp" type="password" autoComplete="new-password" required id="pwd" />
                    <span>Password</span>
                </div>
                {/* <div className="field s1">
                    <input defaultChecked={isOTP} onChange={e => setChecker(e.target.value)} oninvalid="setCustomValidity('Please accept the T&C')" className="radioLog" type="radio" required id="radioCheck" />
                    <label for="radioCheck" id="radioF">I agree to terms & conditions of Pop Resume</label>
                </div> */}
                <div className="field">
                    <button className="logSub" disabled={loading} type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

function Register() {
    const [id, setId] = useState(null),
        [pwd, setPwd] = useState(null),
        [fname, setFname] = useState(null),
        [lname, setLname] = useState(null),
        [loading, setLoading] = useState(false),
        [check, setChecker] = useState(false),
        [isOTP, setisOTP] = useState(false),
        [OTP, setOTP] = useState(null)
    const handleOTPSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let api = process.env.REACT_APP_API
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                id: String(id).toLowerCase().trim(),
                pwd: String(pwd).trim(),
                fname: String(fname).trim(),
                lname: String(lname).trim(),
                OTP: String(OTP).trim(),
            })
        }
        // axios(api + '/api/otp', options)

        // Enable Loading Animation
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let api = process.env.REACT_APP_API
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ id: String(id).toLowerCase().trim() })
        }
        axios(api + '/api/verify', options)
            .then(res => {
                if (res.data.code === 402) {
                    console.log(res.data)
                    let shaker = document.getElementById('id').classList.add("shake")
                    setTimeout(() => { document.getElementById('id').classList.remove("shake"); setLoading(false) }, 1000)

                    // Insert Toast HERE
                }
                else {
                    setLoading(false)
                    setisOTP(true)
                }
            })
            .catch(err => console.log(err.message))

    }
    return (
        <>
            <form onSubmit={e => isOTP ? handleOTPSubmit(e) : handleSubmit(e)}>
                <div className="field s1">
                    <input pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' oninvalid="setCustomValidity('Enter a valid Email ID')" onChange={e => setId(e.target.value)} className="logInp" type="text" autoComplete="email" required id="id" />
                    <span>Email ID</span>
                </div>
                <div className="field s1">
                    <input onChange={e => setFname(e.target.value)} oninvalid="setCustomValidity('Please enter your First Name')" className="logInp" type="text" autoComplete="given-name" required id="fname" />
                    <span>First Name</span>
                </div>
                <div className="field s1">
                    <input onChange={e => setLname(e.target.value)} oninvalid="setCustomValidity('Please enter your Last Name')" className="logInp" type="text" autoComplete="family-name" required id="lname" />
                    <span>Last Name</span>
                </div>
                <div className="field s1">
                    <input onChange={e => setPwd(e.target.value)} oninvalid="setCustomValidity('Please enter a Password')" className="logInp" type="password" autoComplete="new-password" required id="pwd" />
                    <span>Password</span>
                </div>
                <div className="field">
                    <input disabled={!isOTP} onChange={e => setOTP(e.target.value)} className="logInp" type="text" autoComplete="one-time-code" required id="id" />
                    <span>{!isOTP ? 'Click on submit to generate OTP' : 'OTP'}</span>
                </div>
                <div className="field s1">
                    <input defaultChecked={isOTP} onChange={e => setChecker(e.target.value)} oninvalid="setCustomValidity('Please accept the T&C')" className="radioLog" type="radio" required id="radioCheck" />
                    <label for="radioCheck" id="radioF">I agree to terms & conditions of Pop Resume</label>
                </div>
                <div className="field">
                    <button className="logSub" disabled={loading} type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

class Resume extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            origin: (this.props.location.origin === undefined ? 1 : parseInt(this.props.location.origin))
        }
    }
    componentDidMount() {
        /**
         * Below has been referenced from: https://codepen.io/kdurber/pen/gzmqMQ?editors=0010
         */
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
                        <div className={this.state.origin ? "switcher regMode" : "switcher loginMode"} onClick={(e) => { console.log(this.state.origin); this.setState({ origin: (!this.state.origin) }); }}>
                            <img src={hmm} alt="hmm" srcset="" className="hmm" />
                        </div>
                        <div className="loginLogo" draggable={false}>
                            <img src={image} alt="logo" />
                        </div>
                        <div className="containerLogin">
                            {this.state.origin ? <Register /> : <Login />}
                        </div>
                    </div>
                    <div className="bar2"></div>
                </div>
            </div>
        )
    }
}

export default Resume