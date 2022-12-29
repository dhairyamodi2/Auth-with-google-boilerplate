import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/img.jpg";
import "./LoginPage.css";
import {FcGoogle} from 'react-icons/fc';

const LoginPage : React.FC = () => {
    return (
        <div className="login">
            <div className="login-component">
                <h3>Company Name</h3>
                <h4>Log In</h4>

                <Link to={''} className='google-sign'>
                    <FcGoogle className="google-icon"/>Continue with Google
                </Link>

                <span className="span-text">OR LOGIN WITH EMAIL</span>
                <input type={'email'} placeholder='Email' className="google-sign input">

                </input>

                <input type={'password'} placeholder='Password' className="google-sign input">

                </input>

                <button className="sign-button">Log In</button>

            </div>
            <div className="img-component">
                <img src={img} className='animated-image'></img>
            </div>
        </div>
    )
}

export default LoginPage;