import '../Styles/CreatePost.css';
import {useContext, useState} from 'react';
import axios from 'axios';
import { AuthContext } from '../authContext';
import { useHistory } from 'react-router';

const CreatePost = () => {

    const {username} = useContext(AuthContext);

    const history = useHistory();

    const [postData, setPostData] = useState({
        title: '',
        content: '',
    });

    const handleTitleChange = (e) => {
        setPostData({title : e.target.value, username: postData.username, description: postData.description});
    }

    const handleContentChange = (e) => {
        setPostData({content : e.target.value, username: postData.username, title: postData.title});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            data: {
                username,
                title: postData.title,
                content: postData.content 
            },
            url: 'http://localhost:5000/api/posts/add'
        })
        .then(res => history.push('/'));

    }

    return(
        <div className = "PostMenu">
            <form className = "post-menu-main">
                <input className = "post-menu-input" placeholder = "Title" value = {postData.title} onChange = {handleTitleChange}/>
                <textarea className = "post-menu-textarea" placeholder = "Enter Description" value = {postData.content} onChange = {handleContentChange}></textarea>
                <button 
                    onClick = {handleSubmit} 
                    className = "nav-button-fill" 
                    style = {{opacity : postData.title.length > 0 ? "1" : "0"}}
                    disabled = {postData.title.length > 0 ? false : true}
                >Post</button>   
            </form>
        </div>
    );
}

export default CreatePost;