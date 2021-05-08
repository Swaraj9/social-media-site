const User = require('./models/user.model');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({username}, (err, user) => {
                if(err) {return done(err);}
                if(!user) return done(null, false, {message: "Incorrect Username"});
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {return done(err);}
                    if(result === true) return done(null, user);
                    else return done(null, false, {message: "Incorrect Password"});
                });
            });
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id}, (err, user) => {
            cb(err, user);
        });
    });
};

