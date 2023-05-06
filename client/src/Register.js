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
    
    /*
    0. PDS sends user PDS public key
    1. USER Registers and PDS creates a public key and private key for the user
    2. User creates shared key for the themselves and stores it locally in file
    3. USER then sends email, and users public key
    4. PDS uses users public key to create shred key of its own
    5. Inserts UID, email, and created shared key (shared key is encrypted by PDS public key)
    6. Once inserted into pds db, return to log in page
    */

    /*
    Pds has their digital ID
    Client registers. Username and password get added to mongodb. 
        Then client has digital ID created
    Client receives PDS public key
        Uses client digital ID(pub + priv) key + PDS public key to generate shared key.
        Shared key is stored with their didgital ID but needs to be encrypted with clients public key
    After client has generated own shared key
        Client sends PDS client email and password (encrypted with shared key), and clients public key
    PDS uses clients public key and PDS digital ID to generate same shared key. 
    PDS retrieves client email, password and stores it in database with shared key which is encrypted by PDS public key
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
        await axios.post('/createUser', userDataJson);
        // Creating public and private keys 
        const userSecurity = await axios.post('http://localhost:9500/register', { email: userDataJson.userEmail });

        // const userKeyEntry = await axios.post('http://localhost:9500/createUserKeyEntry', { email: userDataJson.userEmail }); 
        const error = document.getElementById('submission error');
        
        if(!userCreated)
        {
            error.textContent = "User not created. Please try again"
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