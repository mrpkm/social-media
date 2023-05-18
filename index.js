const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oaut2-strategy');
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// const chatServer = require('http').Server(app);
// const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
// chatServer.listen(5000);
// console.log("chat server is listeing on port 5000");


//1 require sass 
// const sassmiddleware = require('node-sass-middleware');

// //2 used sass  // 3 go to assets and creat a scss folder and scss file and style it
// app.use(sassmiddleware({
// src: './assets/scss',
// dest: './assets/css',
// debug: true,
// outputStyle: 'expanded',
// prefix: '/css'
// }));

app.use(express.urlencoded());
// cookies
app.use(cookieParser());

app.use(expressLayout)
app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'))
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set view engine
app.set('view engine', 'ejs')
app.set('views', './views')

// mongo store is used to store the session cookies in the db
app.use(session({
    name: "codeal",
    // to do change secert before development before in a production mode
    secret: "balhsomethings",
    saveUninitialized: false,
    resave: false,
    Cookie: {
        // maxAge: (1000 * 60 * 100)
        maxAge: (5000)
    },
    store: MongoStore.create(
        {
            // mongooseConnection: db,
            mongoUrl: 'mongodb://127.0.0.1/codeial_delopment',
            autoRemove: "disabled"
        },
        // function (err) {
        //     console.log(err || "connect mongo bd setup okk")
        // }
    )
}));
// for cookies
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//flash
app.use(flash());
app.use(customMware.setFlash);

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');



app.use('/', require('./routes'))// import from router 


app.listen(port, function (err) {
    if (err) {
        console.log(`error is on running the surever on port: ${port}`);
    }
    console.log(`server is running successfull on port : ${port}`);
})