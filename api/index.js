const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('./models/user.js');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();

app.use(express.json())

const origin = 'http://localhost:5173';

const  salt = bcrypt.genSaltSync(10);

const jwtSecret = 'jt1qnpnpje';

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: origin
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res)=> {
    res.json('test good');
});

app.post('/register', async (req,res) => {
    const {name, email, password } = req.body;
     try{
    const userDocument = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, salt),
    });

    res.json(userDocument);
} catch(e){
    res.status(422).json(e);
}
});

app.post('/login', async (req,res) =>{
    const {email, password} = req.body;
    const userDocument = await User.findOne({email});
    if(userDocument){
        const accepted = bcrypt.compareSync(password, userDocument.password);
        if(accepted){
            jwt.sign({email: userDocument.email, 
                d:userDocument._id, 
                ame: userDocument.name}, 
                jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(userDocument);
            });
    } else {
        res.status(422).json('Wrong Password');
    } 
} else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if(err) throw err;
            const {name, email, _id} = await User.findById(user.id);
            res.json(name, email, _id);
        });
    } else {
    res.json(null);
    }
})
app.listen(4000);
