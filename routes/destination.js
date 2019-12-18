const destinationControllers = require('../controllers/destination');
const uploadFactory = require('../services/files');
const isAuth = require('../middlewares/isAuth');

FILE_TYPES = [
    "application/pdf",
    "image/jpg",
    "image/jpeg",
    "image/png"
]

const upload = uploadFactory("archivos-destinos", FILE_TYPES).fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
]);

module.exports = router => {
    router.post('/api/crear-destino', isAuth, upload, destinationControllers.createDestination);
    router.put('/api/editar-destino/:id', isAuth, upload, destinationControllers.editDestination);
    router.post('/api/eliminar-destino/:id', isAuth, destinationControllers.deleteDestination);
    router.post('/api/eliminar-imagen-galeria/:id', isAuth, destinationControllers.deleteGalleryImage);
    router.get('/api/destinos', destinationControllers.getDestinations);
    router.get('/api/ultimos-destinos', isAuth, destinationControllers.getLastDestinations);
}