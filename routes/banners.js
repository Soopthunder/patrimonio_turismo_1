const bannersControllers = require('../controllers/banners');
const uploadFactory = require('../services/files');
const isAuth = require('../middlewares/isAuth');

FILE_TYPES = [
    "image/jpg",
    "image/jpeg",
    "image/png"
]

const upload = uploadFactory("imagenes-banners" , FILE_TYPES ).single('image');

module.exports = router => {
    router.get('/api/banners', bannersControllers.getBanners);
    router.post('/api/agregar-banner/', isAuth, upload, bannersControllers.addBanner);
    router.put('/api/editar-banner/:id', isAuth, upload, bannersControllers.editBanner);
    router.delete('/api/borrar-banner/:id', isAuth,  bannersControllers.deleteBanner);
};