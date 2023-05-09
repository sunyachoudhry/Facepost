import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Auth, API } from 'aws-amplify';
import axios from 'axios'

//Validates Email addr
function ValidateEmail() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [authenticationCode, setAuthenticationCode] = useState('');

    const handleRegisterConfirmation = async (e) => {
        e.preventDefault()
        try {
            await Auth.confirmSignUp(email, authenticationCode)
            // Use this commented code below to add post to post table on SNE
            // API.post('userapi', '/user', {
            //     body : {
            //         email: email,
            //         postid: "postid_dwdjejddew",
            //         digitalsignature: "digitalsignature",
            //         serviceurl: "http://imagelink.com",
            //     }
            // })
            // .then((response) => {
            //     console.log("New User Created!")
            // })
            // .catch((error) => {
            //     console.log(error.response);
            // });

            navigate('/')
        } catch (err) { console.log(err) }
    }

    return (
        <div className='Validate'>
            <form className="validate">
                <h1>Validate Email</h1>
                <h4>Enter Email:</h4>
                <input onChange={evt => setEmail(evt.target.value)}/>
                <h4>Enter Code:</h4>
                <input onChange={evt => setAuthenticationCode(evt.target.value)}/>
            </form>
            <button onClick={handleRegisterConfirmation}>Validate</button>
        </div>
    )
}

export default ValidateEmail
