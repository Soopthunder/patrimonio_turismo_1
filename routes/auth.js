const authControllers = require('../controllers/auth');
const passport = require('passport');

module.exports = router => {
    router.post('/api/login', passport.authenticate('local') , authControllers.login);
    router.get('/api/logout', authControllers.logout);
    router.get('/api/current_user', authControllers.currentUser);
}