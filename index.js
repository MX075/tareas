const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


require('./database')
const secret = require('./secret')

const app = express()

//estrategia de passport

const passportLocal = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())




app.use(cookieParser(secret));
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

app.use("/api", require("./routers"));


app.listen(4100, () => {
    console.log('server on port', '4100')
})