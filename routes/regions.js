const regionsControllers = require('../controllers/regions');
const cors = require('../middlewares/cors');
const isAuth = require('../middlewares/isAuth');

module.exports = router => {
    router.get('/api/regiones', cors, regionsControllers.getRegions);
    router.put('/api/actualizar-regiones', isAuth, regionsControllers.updateRegions );
}