const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    username : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    content : {
        type: String
    },
    votes : {
        type: Number,
        required: true,
        default: 0
    },
    comments : {
        type: Array,
        default: []
    }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;