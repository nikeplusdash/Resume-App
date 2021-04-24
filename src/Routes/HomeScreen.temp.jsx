import React from "react";
import Custom from "../Components/Custom";
import image from '../logowt.svg';
import '../css/home.css'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="container">
                <Custom />
                <div className="nav">
                    <div className="wrap-nobg"><div className="i1">Login</div></div>
                    <div className="wrap-bg"><div className="i2">Register</div></div>
                </div>
                <img className="logo-img" src={image} alt="logo" />
                <div className="joint">
                    <div className="circleBG" />
                    <div className="control">
                        <div className="theme g1">
                            <div className="color c1" />
                            <div className="txt t1">Cherry Red</div>
                        </div>
                        <div className="theme g2">
                            <div className="color c2" />
                            <div className="txt t2">Aqua Sky</div>
                        </div>
                        <div className="theme g3">
                            <div className="color c3" />
                            <div className="txt t3">Mirror White</div>
                        </div>
                    </div>
                    <div className="resume"></div>
                </div>
                HELLo
            </div>
        )
    }
}

export default Home;