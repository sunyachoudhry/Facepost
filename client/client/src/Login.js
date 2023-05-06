import './login.css';
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState('')
    const navigate = useNavigate(); 

    useEffect(() => {
        if (loggedIn) 
        {
            navigate("/post");
        }
      }, [loggedIn]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = { logEmail: email, logPassword: password}; 
        const userToBeLoggedIn = await axios.get("/checkUser", { params: loginData });
        const err = document.getElementById("LogIn Error");


        if (userToBeLoggedIn.status !== 200)
        {
            err.textContent = "Login credentials invalid. Please try again."
        }
        else
        {
            setLoggedIn(userToBeLoggedIn);
        }
    }

    return (
        <div className = "Login">
            <div className = "auth-form-container">
                <h2>Login</h2>
                <form className = "login-form" onSubmit = {handleSubmit}>
                    <span id ="LogIn Error"></span>
                    <label htmlFor = "email">Email</label>
                    <input value={email} type="email" onChange={e => setEmail(e.target.value)} placeholder = "yourname@mail.com"/>
                    <label htmlFor = "password">Password</label>
                    <input value = {password} type = "password" onChange={e => setPassword(e.target.value)} placeholder = "*******"/>
                    <button id= "loginButton" type = "submit"> Log In </button>
                </form>
                <Link exact to="/register" className="link-button">Don't have an account? Register here.</Link>
            </div>
        </div>
    )
}

export default Login;