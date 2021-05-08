import {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [likedPosts, setLikedPosts] = useState([]);

    return(
        <AuthContext.Provider value = {{isLoggedIn, setIsLoggedIn, username, setUsername, likedPosts, setLikedPosts}}>
            {props.children}
        </AuthContext.Provider>
    );
}