const CookieSession = require('cookie-session');

module.exports = CookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    keys: [process.env.COOKIE_KEY]
});