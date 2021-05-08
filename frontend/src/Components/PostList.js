import '../Styles/PostList.css';
import Post from './Post';

const PostList = ({postList, getUser}) => {
    return(
        <div className = "PostList">
            {postList.map(post => <Post postData = {post} getUser = {getUser} key = {post._id}/>)}
        </div>
    );
}

export default PostList;