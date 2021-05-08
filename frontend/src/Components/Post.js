import '../Styles/Post.css';
import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../authContext';

const Post = ({postData, getUser}) => {

    const {username, likedPosts} = useContext(AuthContext);

    const [comment, setComment] = useState("");
    const [commentMenuOpen, setCommentMenuOpen] = useState(false);

    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted]  = useState(false);

    const upvote = () => {
        axios({
            method: "post",
            data: {
                id: postData._id,
                username, 
            },
            url: "http://localhost:5000/api/posts/update/upvote"
        })
        .then(data => {
            getUser();
            
        });
    }

    const downvote = () => {
        axios({
            method: "post",
            data: {
                id: postData._id,
                username
            },
            url: "http://localhost:5000/api/posts/update/downvote"
        })
        .then(data => getUser());
    }

    const postComment = () => {
        setComment("");
        axios({
            method: "post",
            data: {
                id: postData._id,
                comment,
                username
            },
            url: "http://localhost:5000/api/posts/update/comment"
        })
        .then(data => getUser());
    }

    useEffect(() => {
        getUser();
        if(likedPosts.some(likedPost => likedPost.upvoted === postData._id)){
            setUpvoted(true);
        }
        else{
            setUpvoted(false);
        }

        if(likedPosts.some(likedPost => likedPost.downvoted === postData._id)){
            setDownvoted(true);
        }
        else{
            setDownvoted(false);
        }
    }, [getUser, likedPosts, postData._id]);

    return(
        <div className = "Post">
            <div className = "post-header">
                <p className = "post-username">By {postData.username}</p>
                <p className = "post-title">{postData.title}</p>
            </div>
            <div className = "post-body">{postData.content}</div>
            <div className = "post-footer">
                <div className = "footer-sec">
                    <button style = {{color: upvoted ? "orange" : "rgb(170, 170, 170)"}} className = "post-footer-button" onClick = {upvote}><i className = "fas fa-angle-double-up fa-xs"></i></button>
                    <p className = "post-footer-text">{postData.votes}</p>
                    <button style = {{color: downvoted ? "dodgerblue" : "rgb(170, 170, 170)"}} className = "post-footer-button" onClick = {downvote}><i className = "fas fa-angle-double-down fa-xs"></i></button>
                </div>
                <div className = "footer-sec">
                    <button className = "post-footer-button" onClick = {() => setCommentMenuOpen(!commentMenuOpen)}>
                        <i className="fas fa-comment-alt fa-xs"></i>
                        <p className = "post-footer-text">Comments</p>
                    </button>            
                </div>
                <div className = "footer-sec">
                </div>           
            </div>
            {commentMenuOpen && 
            <div className = "post-comments">
                <div className = "post-comments-input">
                    <input value = {comment} onChange = {(e) => setComment(e.target.value)} placeholder = "Comment?" className = "post-input"></input>
                    <button onClick = {postComment} className = "post-comment-button">Post</button>
                </div>
                {postData.comments.map(commentObj => <Comment content = {commentObj.comment} username = {commentObj.username}/>)}
            </div>}
        </div>
    );
}

export default Post;

const Comment = ({content, username}) => {

    return(
        <div className = "Comment">
            <p className = "comment-text">{username} : {content}</p>
        </div>
    );
}