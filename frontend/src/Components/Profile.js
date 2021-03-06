import '../Styles/Profile.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PostList from './PostList';
import { useParams } from 'react-router';

const Profile = ({getUser}) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    let {username} = useParams();

    const getProfilePosts = () => {
        axios({
            method: "post",
            data: {
                username
            },
            url: 'http://localhost:5000/api/posts/profile'
        })
        .then(res => {
            setPosts(res.data);
            setLoading(false);
        });
    }

    useEffect(getProfilePosts, [username]);

    return (
        <div className = "Profile">
            <h3>Posts by {username}</h3>
            {loading ? <h3 className = "message">Loading...</h3> : !loading && posts.length < 0 ? <h3 className = "message">No Posts yet...</h3> : !loading && posts.length > 0 ? <PostList postList = {posts} getUser = {getUser}/> : ""}
        </div>
    )
}

export default Profile;
