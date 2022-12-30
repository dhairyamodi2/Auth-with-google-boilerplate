import React, { ChangeEvent, useEffect, useState } from "react";
import img from "../assets/img.jpg";
import "./LoginPage.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector"

interface UserInfo {
    name: string,
    email: string,
    mobileNumber: string;
}

const BearerPage: React.FC = () => {

    const [country, selectCountry] = useState('');
    const [region, selectRegion] = useState('');

    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "",
        email: "",
        mobileNumber: ""
    })
    useEffect(() => {
        fetch('http://localhost:8000/auth/google', {
            method: 'GET',
            headers: {
                'token': sessionStorage.getItem('credentials') ? sessionStorage.getItem('credentials') as string : "",
                'client_id': sessionStorage.getItem('client_id') ? sessionStorage.getItem('client_id') as string : ""
            }
        }).then(data => data.json()).then((data) => {
            if (data.success === true) {
                setUserInfo((prevState) => {
                    return {
                        ...prevState,
                        name: data.name,
                        email: data.email
                    }
                })
            }
        }).catch(err => console.log(err));
    }, [])


    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(userInfo.mobileNumber.length !== 10){
            alert("Enter valid mobile number!")
            setUserInfo(prevState => {return {...prevState, mobileNumber: ""}});
            return;
        }

        if(country.length === 0){
            alert("Enter valid country name");
            return;
        }

        if(region.length === 0){
            alert("Enter  valid region")
            return;
        }

        const obj = {...userInfo, country, region};
        console.log(obj)


    }
    return (
        <div className="login">
            <form className="login-component signup">
                <h3>Company Name</h3>
                <h4>Complete your profile</h4>

                <input
                    type={'text'}
                    placeholder='Name'
                    className="google-sign input"
                    value={userInfo.name}
                    disabled>
                </input>

                <input
                    type={'email'}
                    placeholder='Email'
                    className="google-sign input"
                    value={userInfo.email}
                    disabled>
                </input>

                <input type={'number'} placeholder='Mobile Number' className="google-sign input" 
                value={userInfo.mobileNumber} onChange={(event) => setUserInfo(prevState => 
                    {
                        return {
                            ...prevState, 
                            mobileNumber: event.target.value
                        }})}
                required>
                </input>

                <CountryDropdown value={country} onChange={selectCountry} classes='google-sign input' />
                <RegionDropdown country={country} value={region} onChange={selectRegion} classes='google-sign input' />
                <button className="sign-button" onClick={handleSubmit}>Sign Up</button>


            </form>
            <div className="img-component">
                <img src={img} className='animated-image'></img>
            </div>
        </div>
    )
}

export default BearerPage;