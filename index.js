const express = require('express');
const passport = require('passport');

const session = require('./services/session');
const connectDatabase = require('./services/db');
require('./services/passport');
const routes = require('./routes');
const cors = require('./middlewares/cors');

const app = express();

app.use(express.json());
app.use(cors);
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  //
  const helmet = require('helmet');
  app.use(helmet());

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(routes);
app.use(express.static('uploads'));


connectDatabase()
    .then(() => {
        app.listen(process.env.PORT);
        console.log("Server is running in port " + process.env.PORT); 
    })
    .catch(error =>{
        console.log(error);
    }) 

