import './login.css';
import React, {useState} from "react";
import { Link } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted");
    }

    return (
        <div className = "Login">
            <div className = "auth-form-container">
                <h2>Login</h2>
                <form className = "login-form" onSubmit = {handleSubmit}>
                    <label htmlFor = "email">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder = "yourname@mail.com"/>
                    <label htmlFor = "password">Password</label>
                    <input value = {password} onChange={e => setPassword(e.target.value)} type = "password" placeholder = "*******"/>
                    <button id= "loginButton"> Log In </button>
                </form>
                <Link exact to="/register" className="link-button">Don't have an account? Register here.</Link>
            </div>
        </div>
    )
}

export default Login;