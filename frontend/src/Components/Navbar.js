import '../Styles/Navbar.css';
import {BrowserRouter as Router, Link, Switch} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import axios from 'axios';
import {useContext} from 'react';
import Home from '../Components/Home';
import { AuthContext } from '../authContext';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';
import CreatePost from './CreatePost';

const Navbar = () => {
    const {isLoggedIn ,setIsLoggedIn, setUsername, setLikedPosts, username} = useContext(AuthContext);
    const changeWidth = 814;

    const getUser = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:5000/api/user"
        })
        .then(res => {
            setIsLoggedIn(true);
            setUsername(res.data.username);
            setLikedPosts(res.data.likedPosts);
        })
        .catch(err => console.log(err));
    }

    const logOut = () => {
        setIsLoggedIn(false);
        setUsername("");
        setLikedPosts([]);
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:5000/api/logOut"
        })
        .then(res => {});
    }

    return (
        <Router>
            <div className = 'Navbar'>
                <Link to = "/" className = "nav-logo">Smedia</Link>
                {isLoggedIn ? 
                <Link to = {`/profile/${username}`} className = "nav-button-text">
                    {window.innerWidth > changeWidth ? "Profile" : <i className="fas fa-user"></i>}
                </Link> : ""}
                {isLoggedIn ? 
                <Link to = '/createPost' className = "nav-button-text">
                    {window.innerWidth > changeWidth ? "Post" : <i className="fas fa-plus-square"></i>}
                </Link> : ""}
                <div id = "login-container">
                    {isLoggedIn ? "" : 
                    <Link to = '/register' className = "nav-button-fill">
                        {window.innerWidth > changeWidth ? "Register" : <i className="fas fa-user-plus"></i>}
                    </Link>}
                    {isLoggedIn ? 
                    <button onClick = {logOut} className = "nav-button-fill">
                        {window.innerWidth > changeWidth ? "LogOut" : <i className="fas fa-sign-out-alt"></i>}
                    </button> : 
                    <Link to = '/login' className = "nav-button-fill">
                        {window.innerWidth > changeWidth ? "LogIn" : <i className="fas fa-sign-in-alt"></i>}
                    </Link>}
                </div>  
            </div> 

            <Switch>
                <PrivateRoute exact path = "/" loginCondition = 'loggedIn'>
                    <Home getUser = {getUser}/>
                </PrivateRoute>
                <PrivateRoute path = '/register' loginCondition = 'loggedOut'>
                    <Register updateStateFunc = {getUser}/>
                </PrivateRoute>
                <PrivateRoute path = '/login' loginCondition = 'loggedOut'>
                    <Login updateStateFunc = {getUser}/>
                </PrivateRoute>
                <PrivateRoute path = '/createPost' loginCondition = "loggedIn">
                    <CreatePost/>
                </PrivateRoute>
                <PrivateRoute path = "/profile/:username" loginCondition = "loggedIn" children = {<Profile getUser = {getUser}/>}>
                </PrivateRoute>
            </Switch>
        </Router>       
    );
}

export default Navbar;