require('dotenv').config();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const port = process.env.APP_PORT || 3000;

// Middleware//
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: 'http://localhost:5173',  // Adjust for your front-end's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials : true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
// Register Routes //
app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});