import React, {useState} from "react";

export const Register = (props) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        
    }
    
    return (
        <div className = "auth-form-container">
            <h2>Register</h2>
        <form className = "register-form" onSubmit = {handleSubmit}>
            <label htmlFor = "email"> email</label>
            <input value = {email} type = "email" placeholder = "yourname@mail.com" id = "email" name = "email"/>
            <label htmlFor = "password"> password</label>
            <input value = {pass} type = "password" placeholder = "*******" id = "password" name = "password"/>
            <button> Log In</button>
        </form>
        <button className = "link-button" onClick = {() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}