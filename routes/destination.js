const destinationControllers = require('../controllers/destination');
const passport = require('passport');

module.exports = router => {
    router.post('/api/crear-destino', destinationControllers.createDestination);
}