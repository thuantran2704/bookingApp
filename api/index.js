const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('./models/user.js');
const bcrypt = require('bcryptjs');


const app = express();

dotenv.config();

app.use(express.json())

const origin = 'http://localhost:5173';

const  salt = bcrypt.genSaltSync(10);

const jwtSecret = 'JT1qnpNpJe';

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
    const userDocument = await User.findOne({email: email});
    if(userDocument){
        const accepted = bcrypt.compareSync(password, userDocument.password);
        if(accepted){
            jwt.sign({email: userDocument.email, id:userDocument._id}, jtwSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json('login successfully');
            })
            res.cookie('token', '').json('Went through');
        }
    } else {
        alert('Password or Account incorrect');
        res.status(422).json('Wrong Password');
    }
})


app.listen(4000);
