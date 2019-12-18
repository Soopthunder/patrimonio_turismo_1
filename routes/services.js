const serviceControllers = require('../controllers/services');
const uploadFactory = require('../services/files');
const isAuth = require('../middlewares/isAuth');

FILE_TYPES = [
    "image/jpg",
    "image/jpeg",
    "image/png"
]

const upload = uploadFactory("imagenes-servicios" , FILE_TYPES ).single('image');

module.exports = router => {
    router.get('/api/servicios',  serviceControllers.getServices);
    router.post('/api/agregar-servicio/', isAuth, upload , serviceControllers.addService);
    router.put('/api/editar-servicio/:id', isAuth, upload , serviceControllers.editService);
    router.delete('/api/borrar-servicio/:id', isAuth, serviceControllers.deleteService);
};