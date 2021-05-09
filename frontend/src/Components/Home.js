import '../Styles/Home.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import PostList from './PostList';

const Home = ({getUser}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPosts = async () => {
        const res = await axios({
            method: "get",
            url: "http://localhost:5000/api/posts"
        })
        setPosts(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getPosts();
    })

    return (
        <div className = "Home">
            <h3>Top Posts</h3>
            {loading ? <h3 className = "message">Loading...</h3> : !loading && posts.length < 0 ? <h3 className = "message">No Posts yet...</h3> : !loading && posts.length > 0 ? <PostList postList = {posts} getUser = {getUser}/> : ""}
        </div>
    )
}

export default Home
