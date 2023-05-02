import './login.css';
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export const Register = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [userCreated, setUserCreated] = useState(); 
    const navigate = useNavigate(); 
    
    // When register, after added to atlas, generate public/private key for the user. Store in facepost_email/.ssh (public key, private key, shared key)
    // get pds public key, for client, generate shared key (digital ID + PDS public key) <-- Deff Hellman
        // do this when registering
    // then do (digital id of the PDS + clients public key) <-- Store in 
        // when sending info to pds, also send public key of user when communicating for the firs ttime
    // at time of register submit: user sends email addr to pds, password,  -->(encrypted by users shared key+ send pub key in plain text
    //pds user table: UID, email, password, pubkey, store shared key (encrypted by PDS public key)

    /*
    0. PDS sends user PDS public key
    1. USER Registers and PDS creates a public key and private key for the user
    2. User creates shared key for the themselves and stores it locally in file
    3. USER then sends email, and users public key
    4. PDS uses users public key to create shred key of its own
    5. Inserts UID, email, and created shared key (shared key is encrypted by PDS public key)
    6. Once inserted into pds db, return to log in page
    */
    useEffect(() => {
        if (userCreated) 
        {
            navigate("/");
        }
      }, [userCreated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the post request to the server using axios
        const userDataJson = { userEmail: email, userPassword: pass}; 
        await axios.post('/createUser', userDataJson)
        .then(response => setUserCreated(response));
        const error = document.getElementById('submission error');
        
        if(!userCreated)
        {
            error.textContent = "User not created. Please try again"
        }
        else
        {
            // PDS create public/private key for the user
            
        }
    }
    
    return (
        <div className = "Register">
            <div className = "auth-form-container">
                <h2>Register</h2>
                <form className = "register-form" onSubmit = {handleSubmit}>
                    <span id = "submission error"></span>
                    <label htmlFor = "email">Email</label>
                    <input value = {email} type = "email" onChange={e => setEmail(e.target.value)} placeholder = "yourname@mail.com" id = "email" name = "email"/>
                    <label htmlFor = "password">Password</label>
                    <input value = {pass} type = "password" onChange={e => setPass(e.target.value)} placeholder = "*******" id = "password" name = "password"/>
                    <button id = "registerButton" type = "submit">Register</button>
                </form>
                <Link exact to="/" className="link-button">Already have an account? Login here.</Link>
            </div>
        </div>
    )
}

export default Register; 