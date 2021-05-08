const router = require('express').Router();
const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    User.findOne({username: req.body.username}, async (err, doc) => {
        if(err) throw err;
        if(doc) res.send('User Already Exists');
        const hashedPassword = await bcrypt.hash(req.body.password1, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await newUser.save();
        res.send("User Created");
    })
});

module.exports = router;