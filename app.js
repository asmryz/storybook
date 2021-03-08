const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const session =  require('express-session');
const MongoStore = require('connect-mongo').default
const path = require('path');
const passport  = require('passport')

// Load Config
dotenv.config({ path: './config/config.env'});

// Passport Config
require('./config/passport')(passport)
const clientP = connectDB();
const app = express()


// Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// HandleBars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({clientPromise: clientP}),  // New Syntax here!
  }))


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Static
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port http://localhost:${PORT}`))