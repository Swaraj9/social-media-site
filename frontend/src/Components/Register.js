import { useState } from 'react';
import axios from 'axios';
import '../Styles/Register.css';
import {Link, useHistory} from 'react-router-dom';

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const history = useHistory();

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
                props.updateStateFunc();
                history.push('/login');
            });
        }else{
            setPasswordError(true);
        }    
    }

    return(
        <div className = "Register">
            <input className = "register-input" placeholder = "Username" value = {username} onChange = {(e) => setUsername(e.target.value)}/>
            <input className = "register-input" placeholder = "Password" value = {password1} onChange = {(e) => setPassword1(e.target.value)} type = "password"/>
            <input className = "register-input" placeholder = "Confirm Password" value = {password2} onChange = {(e) => setPassword2(e.target.value)} type = "password"/>
            <button className = "nav-button-fill" onClick = {register}>Submit</button>
            <Link to = "/login" className = "nav-button-text">Already have an account? Login</Link>
            {passwordError && <div className = "error-box"><h3 className = "error-msg">Both password fields must have the same value</h3></div>}
        </div>
    );
}

export default Register;