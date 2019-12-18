const settingsControllers = require('../controllers/settings');
const isAuth = require('../middlewares/isAuth');

module.exports = router => {
    router.put('/api/actualizar-usuario', isAuth, settingsControllers.updateUsername );
    router.put('/api/actualizar-password', isAuth, settingsControllers.updatePassword );
    router.put('/api/actualizar-email', isAuth, settingsControllers.updateEmail );
};