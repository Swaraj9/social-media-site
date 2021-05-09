const router = require('express').Router();
const Post = require('../../models/post.model');
const User = require('../../models/user.model');

router.get('/', (req, res) => {
    Post.find()
        .limit(20)
        .sort({votes: -1})
        .then(posts => res.json(posts))
        .catch(err => console.log(err));
});

router.post('/profile', (req, res) => {
    Post.find({username: req.body.username})
        .then(posts => res.json(posts))
        .catch(err => console.log(err));
})

router.post('/add', (req, res) => {
    const newPost = new Post({
        username: req.body.username,
        title: req.body.title,
        content: req.body.content,
        votes: 0,
        comments: []
    });
    newPost.save()
           .then(() => res.send("Post Added Successfully"))
           .catch(err => console.log(err));
});

router.post('/update/upvote', (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            const upvoted = user.likedPosts.some(likedPost => likedPost.upvoted === req.body.id);
            const downvoted = user.likedPosts.some(likedPost => likedPost.downvoted === req.body.id);
                Post.findById(req.body.id)
                .then(post => {
                    if(!upvoted && !downvoted){
                        user.likedPosts.push({"upvoted": req.body.id});
                        post.votes = post.votes + 1;
                    }
                    else if(!upvoted && downvoted){
                        user.likedPosts.push({"upvoted": req.body.id});
                        user.likedPosts = user.likedPosts.filter(likedPost => likedPost.downvoted !== req.body.id);
                        post.votes = post.votes + 2;
                    }
                    else if(upvoted && !downvoted){
                        user.likedPosts = user.likedPosts.filter(likedPost => likedPost.upvoted !== req.body.id);
                        post.votes = post.votes - 1; 
                    }
                    user.save()
                        .then(dat => res.send(user.likedPosts));
                    post.save();
                })
                .catch(err => console.log(err));
            }
        )
        .catch(err => console.log(err));
});

router.post('/update/downvote', (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            const upvoted = user.likedPosts.some(likedPost => likedPost.upvoted === req.body.id);
            const downvoted = user.likedPosts.some(likedPost => likedPost.downvoted === req.body.id);
                Post.findById(req.body.id)
                .then(post => {
                    if(!upvoted && !downvoted){
                        user.likedPosts.push({"downvoted": req.body.id});
                        post.votes = post.votes - 1;
                    }
                    else if(upvoted && !downvoted){
                        user.likedPosts.push({"downvoted": req.body.id});
                        user.likedPosts = user.likedPosts.filter(likedPost => likedPost.upvoted !== req.body.id);
                        post.votes = post.votes - 2;
                    }
                    else if(!upvoted && downvoted){
                        user.likedPosts = user.likedPosts.filter(likedPost => likedPost.downvoted !== req.body.id);
                        post.votes = post.votes + 1;
                    }
                    user.save()
                        .then(dat => res.send(user.likedPosts));
                    post.save();
                })
                .catch(err => console.log(err));
            }
        )
        .catch(err => console.log(err));
});

router.post('/update/comment', (req, res) => {
    Post.findById(req.body.id)
        .then(post => {
            post.comments.push({username: req.body.username, comment: req.body.comment});
            post.save();
        })
        .catch(err => console.log(err));
});

module.exports = router;