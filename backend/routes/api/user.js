const router = require('express').Router();

router.get('/', (req, res) => {
    if(req.user){
        res.json({
            username: req.user.username,
            likedPosts: req.user.likedPosts
        });
    }
});

module.exports = router;