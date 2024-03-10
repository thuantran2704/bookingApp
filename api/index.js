const express = require('express');
const app = express();

app.get('/test', (req,res)=> {
    res.json('test good');
})



app.listen(4000);
