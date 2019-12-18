const uploadFactory = require('../services/files');
const GalleryImage = require('../models/galleryImage');
const deleteFile = require('../utils/deletefile');
const isAuth = require('../middlewares/isAuth');

FILE_TYPES = [
    "image/jpg",
    "image/jpeg",
    "image/png"
]

const upload = uploadFactory("imagenes-galeria", FILE_TYPES)
    .fields([{ name: 'gallery', maxCount: 12 }]);

module.exports = router => {
    router.post('/api/subir-galeria', isAuth, upload, async ({ files: { gallery } }, res) => {
        try {
            const responseData = await GalleryImage.find();
            if( responseData.length + gallery.length > 12) 
                return send.status(422).send("El máximo permitido es 12 imagenes")
            await gallery.forEach(async file => {
                const image = new GalleryImage({ imageUrl: '/imagenes-galeria/' + file.filename });
                image.save();
                responseData.push(image)
            })
            res.status(200).send(responseData);
        } catch (error) {
            res.status(500).send("Ha ocurrido un error. Vuelva a intentarlo más tarde")
        }
    });
    router.get('/api/galeria', async (req, res) => {
        try {
            const gallery = await GalleryImage.find();
            res.status(200).send(gallery);
        } catch (error) {
            res.status(500).send("Ha ocurrido un error. Vuelva a intentarlo más tarde")
        }
    });
    router.delete('/api/eliminar-imagen-galeria/:id', isAuth, async ({params: {id}}, res) => {
        try {
            const image = await GalleryImage.findById(id);
            if (!image) throw new Error('No se encontró la iamgen');
            await deleteFile(image.imageUrl);
            await GalleryImage.deleteOne({ _id: id })
            res.status(200).send("Se ha eliminado la imagen");
        } catch (error) {
            res.status(500).send("Ha ocurrido un error. Vuelva a intentarlo más tarde")
        }
    });
}