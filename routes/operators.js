const operatorsController = require('../controllers/operators');
const uploadFactory = require('../services/files');
const isAuth = require('../middlewares/isAuth');

FILE_TYPES = [
    "image/jpg",
    "image/jpeg",
    "image/png"
]

const uploadImage = uploadFactory("imagenes-operadores" , FILE_TYPES ).single('image');
const uploadPdf = uploadFactory("catalogos" , ["application/pdf"] ).single('catalog');

module.exports = router => {
    router.get('/api/operadores', operatorsController.getOperators);
    router.post('/api/agregar-operador/', isAuth, uploadImage, operatorsController.createOperator);
    router.put('/api/editar-operador/:id', isAuth, uploadImage, operatorsController.editOperator);
    router.put('/api/agregar-catalogo/:id', isAuth, uploadPdf, operatorsController.addCatalog);
    router.delete('/api/borrar-operador/:id', isAuth,  operatorsController.deleteOperator);
};