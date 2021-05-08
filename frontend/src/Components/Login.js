import { useState } from 'react';
import axios from 'axios';
import '../Styles/Login.css';
import {Link, useHistory} from 'react-router-dom';

const Login = (props) => {
    const [loginUsername, setLoginUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const login = () => {
        setLoading(true);
        axios({
            method: "post",
            data: {
                username: loginUsername,
                password
            },
            withCredentials: true,
            url: "http://localhost:5000/api/login"
        })
        .then(res => {
            props.updateStateFunc(); 
            if(res.data === "Successfully Authenticated"){
                history.push('/');
            }else if(res.data.message){
                setErrMsg(res.data.message)
            }
            setLoading(false);         
        })
        .catch(err => console.log(err));     
    }

    return(
        <div className = "login-container">
            {loading ? <h3>Loading...</h3> : 
                <div className = "Login">
                    <input className = "login-input" placeholder = "Username" value = {loginUsername} onChange = {(e) => setLoginUsername(e.target.value)}/>
                    <input className = "login-input" placeholder = "Password" value = {password} onChange = {(e) => setPassword(e.target.value)} type = "password"/>
                    <button className = "nav-button-fill" onClick = {login}>Submit</button>
                    <Link to = "/register" className = "nav-button-text">Register</Link>
                    <h3 className = "err-msg">{errMsg}</h3>
                </div>
            }
        </div>
    );
}

export default Login;