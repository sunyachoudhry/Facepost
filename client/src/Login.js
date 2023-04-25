import './login.css';
import {Register} from "./Register";
import React, {useState, useEffect} from "react";
import axios from "axios"; 


export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [changePage, setChangePass] = useState(false); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted");

        try {
            await axios.post('/info', {name: 'John Doe'});
        } catch (error) {
            console.log(error);
        }
    }

    const switchToRegister = () => {
        setChangePass(true);
    }

    
    return (
        <div className = "Login">
            <div className = "auth-form-container">
                <h2>Login</h2>
                <form className = "login-form" onSubmit = {handleSubmit}>
                    <label htmlFor = "email"> email</label>
                    <input value = {email} type = "email" placeholder = "yourname@mail.com" id = "email" name = "email"/>
                    <label htmlFor = "password"> password</label>
                    <input value = {pass} type = "password" placeholder = "*******" id = "password" name = "password"/>
                    <button> Log In </button>
                </form>
                <button className = "link-button" onClick = {switchToRegister}>Don't have an account? Register here.</button>
                {changePage ? <Register /> : null} 
            </div>
        </div>
    )
}

export default Login;