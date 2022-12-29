import React from "react";
import {Link} from 'react-router-dom'
import "./HomePage.css"
const HomePage : React.FC= () => {
    return (
        <div className="home-page">
            <Link to={'/login'} className='links'>Log In</Link>
            <Link to={'/signup'} className='links'>Sign Up</Link>
        </div>
    )
}

export default HomePage;