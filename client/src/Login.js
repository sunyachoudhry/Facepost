import './App.css';
import {Register} from "./Register";
import React, {useState, useEffect} from "react";


export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [changePage, setChangePass] = useState(false); 
    const [backendData, setBackendData] = useState([{}]) 

    useEffect(() => {
        fetch("/Datapoint")
        .then(response => response.json())
        .then(data => {
            setBackendData(data)
        })
    }, []) 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
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

                {(typeof backendData.foods === 'undefined') ? (
                        
                        <p> Loading...</p>) : (

                backendData.foods.map((food, i) => {
                        <p> key = {i}{food}</p>
                }))
                }

            </div>
        </div>
    )
}


export default Login;