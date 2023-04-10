const express = require('express');
const app = express();
const port = 8000;

// use express router 
app.use('/', require('./routes'))// import from router 

// set view engine
app.set('view engine', 'ejs')
app.set('views', './views')


app.listen(port, function (err) {
    if (err) {
        console.log(`error is on running the surever on port: ${port}`);
    }
    console.log(`server is running successfull on port : ${port}`);
})