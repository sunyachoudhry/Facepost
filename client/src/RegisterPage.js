import './login.css';
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { Amplify, Auth } from 'aws-amplify'; 
import awsConfig from './aws-exports';
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";

//Creates Registration Page
export const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const navigate = useNavigate(); 
    
   const handleRegister = async (e) => {
    e.preventDefault();
    try {
        Auth.signUp({
            username: email,
            password
        })

        navigate('/validate')

        // Request PDS public key (PDS)
        const serverKeys = await axios.get('http://localhost:9500/getKeys');
        const pdsPublicKey = serverKeys.data.publicKey;  
        const pdsPrime = serverKeys.data.prime; 

        // Client generates its public and private keys (Client server)
        const clientSharedKey = await axios.post('/getKeys', { email: email, pdsPublicKey: pdsPublicKey, pdsPrime: pdsPrime }); 
        const clientInfo = 
        {
            encryptedEmail: clientSharedKey.data.email,
            encryptedPw:  clientSharedKey.data.autoGenPw,
            clientPublicKey: clientSharedKey.data.clientPublicKey
        }     
        // //Send to pds: encrypted password, email, and client pub key in plain text
        await axios.post('http://localhost:9500/createEntry', {clientInfo: clientInfo} ) 

    } catch (err) { console.log(err) } 
    }
        
    return (
        <div className = "Register">
            <div className = "auth-form-container">
                <h2>Register</h2>
                <form className = "register-form" onSubmit = {handleRegister}>
                    <span id = "submission error"></span>
                    <label htmlFor = "email">Email</label>
                    <input value = {email} type = "email" onChange={e => setEmail(e.target.value)} placeholder = "yourname@mail.com" id = "email" name = "email"/>
                    <label htmlFor = "password">Password</label>
                    <input value = {password} type = "password" onChange={e => setPass(e.target.value)} placeholder = "*******" id = "password" name = "password"/>
                    <button id = "registerButton" type = "submit">Register</button>
                </form>
                <Link exact to="/" className="link-button">Already have an account? Login here.</Link>
            </div>
        </div>
    )
}

export default Register; 