import { useState } from 'react';
import axios from 'axios';
import '../Styles/Register.css';
import {Link, useHistory} from 'react-router-dom';

const Register = ({updateStateFunc}) => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const history = useHistory();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const register = () => {
        if(password1 === password2){
            setPasswordError(false);
            axios({
                method: "post",
                data: {
                    username,
                    password1
                },
                withCredentials: true,
                url: "http://localhost:5000/api/register"
            })
            .then(res => {
                updateStateFunc();
                history.push('/login');
            });
        }else{
            setPasswordError(true);
        }    
    }

    return(
        <div className = "Register">
            <h3>Register</h3>
            <input className = "register-input" placeholder = "Username" value = {username} onChange = {(e) => setUsername(e.target.value)}/>
            <div className = "password-container">
                <input 
                    className = "password-input" 
                    placeholder = "Password" value = {password1} 
                    onChange = {(e) => setPassword1(e.target.value)} 
                    type = {showPassword1 ? "text" : "password"} 
                />
                <button 
                    className = "password-toggle" 
                    onClick = {() => setShowPassword1(!showPassword1)}
                    style = {{backgroundColor: showPassword1 ? "lightgrey" : ""}}
                >
                        <i className="far fa-eye"></i>
                </button>
            </div>
            <div className = "password-container">
                <input 
                    className = "password-input" 
                    placeholder = "Password" value = {password2} 
                    onChange = {(e) => setPassword2(e.target.value)} 
                    type = {showPassword2 ? "text" : "password"} 
                />
                <button 
                    className = "password-toggle" 
                    onClick = {() => setShowPassword2(!showPassword2)}
                    style = {{backgroundColor: showPassword2 ? "lightgrey" : ""}}
                >
                        <i className="far fa-eye"></i>
                </button>
            </div>            
            <button className = "nav-button-fill" onClick = {register}>Submit</button>
            <Link to = "/login" className = "nav-button-text">Already have an account? Login</Link>
            {passwordError && <div className = "error-box"><h3 className = "error-msg">Both password fields must have the same value</h3></div>}
        </div>
    );
}

export default Register;