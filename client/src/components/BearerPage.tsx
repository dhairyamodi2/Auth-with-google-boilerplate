import React, { ChangeEvent, useEffect, useState } from "react";
import img from "../assets/img.jpg";
import "./LoginPage.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector"
import { useNavigate } from "react-router-dom";

interface UserInfo {
    name: string,
    email: string,
    mobileNumber: string;
}

const BearerPage: React.FC = () => {

    const [country, selectCountry] = useState('');
    const [region, selectRegion] = useState('');

    const [loading, setLoading] = useState(false);

    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "",
        email: "",
        mobileNumber: ""
    })

    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8000/auth/google', {
            method: 'GET',
            headers: {
                'token': sessionStorage.getItem('credentials') ? sessionStorage.getItem('credentials') as string : "",
                'client_id': sessionStorage.getItem('client_id') ? sessionStorage.getItem('client_id') as string : ""
            }
        }).then(data => data.json()).then((data) => {
            console.log(data);
            
            if(data.statusCode === 401){
                navigate('/');
            }

            setLoading(false);

            if(data.data.userAlreadyExist){
                localStorage.setItem('token', data.data.token);
                sessionStorage.removeItem('credentials');
                sessionStorage.removeItem('client_id');
                navigate('/');
            }
            
            if (data.success === true) {
                setUserInfo((prevState) => {
                    return {
                        ...prevState,
                        name: data.data.name,
                        email: data.data.email
                    }
                })
                console.log(userInfo)
            }

           
            
            
        }).catch(err => {
            setLoading(false);
            alert(err);
        });
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
        console.log(JSON.stringify(obj));
        const token = sessionStorage.getItem('credentials');
        const client_id = sessionStorage.getItem('client_id');

        if(!token || !client_id){
            alert("Session expired! Please try again!");
            navigate('/signup');
            return;
        }
        fetch('http://localhost:8000/auth/registration/bearer/completeprofile', {
            method: 'POST',
            headers: {
                'token' : token,
                'client_id' : client_id,
                'content-type' : 'application/json'
            },
            body: JSON.stringify(obj)
        }).then((data) => {
            console.log(data);
            return data.json()
        }).then((response) => {
            if(response.success === true){
                localStorage.setItem('token', response.data.token);
                alert("Logged in as " + response.data.user.email);
                sessionStorage.removeItem('credentials');
                sessionStorage.removeItem('client_id');
                navigate('/');
            }
            if(response.success == false){
                alert("Some fields are already taken or there is a conflict logging in your account please try again!")
            }
        }).catch(err => console.log(err))

    }
    return (
        <div className="login">
            {loading ? <h1>Loading...</h1> :
            <>
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
            </>}
        </div>
    )
}

export default BearerPage;