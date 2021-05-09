import '../Styles/PostList.css';
import Post from './Post';

const PostList = ({postList, getUser}) => {
    return(
        <div className = "PostList">
            {postList.map(post => <Post postData = {post} key = {post._id} getUser = {getUser}/>)}
        </div>
    );
}

export default PostList;