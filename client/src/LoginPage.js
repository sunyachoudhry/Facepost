import './login.css';
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import { Auth } from 'aws-amplify'; 
import { Link } from 'react-router-dom';

//Creates login page
export const Login = (props) => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await Auth.signIn(email, password)

            props.updateAuthStatus(true)

            navigate('/post')
        } catch (err) { console.log(err) }
    }

    return (
        <div className = "Login">
            <div className = "auth-form-container">
                <h2>Login</h2>
                <form className = "login-form" onSubmit = {handleLogin}>
                    <span id ="LogIn Error"></span>
                    <label htmlFor = "email">Email</label>
                    <input value={email} type="email" onChange={e => setEmail(e.target.value)} placeholder = "email@mail.com"/>
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