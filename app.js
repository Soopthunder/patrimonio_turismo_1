const express = require('express');
const CookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const connectDatabase = require('./services/db');
const routes = require('./routes/routes');
require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use(CookieSession({maxAge: 30 * 24 * 60 * 60 * 1000, keys: [process.env.COOKIE_KEY]}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

connectDatabase()
    .then(() => {
        app.listen(process.env.PORT);
        console.log("Server is running in port " + process.env.PORT); 
    })
    .catch(error =>{
        console.log(error);
    }) 

