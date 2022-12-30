import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from "./components/HomePage";

import "./App.css"
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import BearerPage from "./components/BearerPage";
const App : React.FC = () => {
    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/login" element={<LoginPage/>} />
                <Route path='/signup' element={<SignUpPage/>} />
                <Route path='/auth/bearer/completeprofile' element={<BearerPage />} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;