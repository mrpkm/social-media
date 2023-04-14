const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded());
// cookies
app.use(cookieParser());

app.use(expressLayout)
app.use(express.static('./assets'));
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

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