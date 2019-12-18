const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {            
            const user = await User.findOne({ username: username });
            if (!user) return done(null, false, { message: 'Usuario incorrecto.' });
            if (!await bcrypt.compare(password, user.password)) return done(null, false, { message: 'Contraseña incorrecta' });
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));