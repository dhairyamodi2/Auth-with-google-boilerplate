import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/img.jpg";
import "./LoginPage.css";
import {FcGoogle} from 'react-icons/fc';
import GoogleSignIn from "./GoogleSignIn";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector"


const SignUpPage : React.FC = () => {

    const [country, selectCountry] = useState('');
    const [region, selectRegion] = useState('');
    return (
        <div className="login">
            <form className="login-component signup">
                <h3>Company Name</h3>
                <h4>Sign Up</h4>

                <GoogleSignIn signup={true}/>

                <span className="span-text">OR SIGN UP WITH EMAIL</span>

                <input type={'text'} placeholder='Name' className="google-sign input" required>

                </input>

                <input type={'email'} placeholder='Email' className="google-sign input" required>

                </input>

                <input type={'password'} placeholder='Password' className="google-sign input" required>

                </input>


                <input type={'number'} placeholder='Mobile Number' className="google-sign input" required>

                </input>

                <CountryDropdown value={country} onChange={selectCountry} classes='google-sign input'/>
                <RegionDropdown country = {country} value={region} onChange={selectRegion } classes='google-sign input'/>
                <button className="sign-button">Sign Up</button>
                

            </form>
            <div className="img-component">
                <img src={img} className='animated-image'></img>
            </div>
        </div>
    )
}

export default SignUpPage;