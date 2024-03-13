const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.json())

const origin = 'http://localhost:5173';

app.use(cors({
    credentials: true,
    origin: origin
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res)=> {
    res.json('test good');
});

app.post('/register', (req,res) => {
    const {name, email, password } = req.body;
    res.json({name,email,password});
})


app.listen(4000);
