//imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

require('dotenv').config();

const app = express();
const port = 5000;

//middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session());
require('./passpostConfig')(passport);

//db connection
const uri = process.env.ATLASS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
    console.log("MongoDB coneection established successfully");
});

//routes
app.use('/api/register', require('./routes/api/register'));

app.use('/api/user', require('./routes/api/user'));

app.use('/api/posts', require('./routes/api/posts'))

app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {return next(err);}
        if(!user) return res.send(info);
        else{
            req.logIn(user, err => {
                if(err) {return next(err);}
                res.send('Successfully Authenticated');
            })
        }
    })(req, res, next);
});

app.get('/api/logout', (req, res) => {
    req.logOut();
    res.send("Logged Out Successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});