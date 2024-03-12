const express = require('express');
const cors = require('cors');

const app = express();

const origin = 'http://localhost:5173';

app.use(cors({
    credentials: true,
    origin: origin
}));

try{
app.get('/test', (req,res)=> {
    res.json('test good');
    console.log('test ok');
});} catch(error){
    console.log(error);
}

app.post('/register', (req,res) => {
    const {name, email, password } = req.body;
    res.json({name,email,password});
})


app.listen(4000);
