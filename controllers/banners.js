const Banner = require('../models/banner');
const deleteFile = require('../utils/deletefile');

exports.addBanner = async ({body:{ title}, file: image }, res) => {
    try {
        const banner = new Banner({
            title, imageUrl: '/imagenes-banners/' + image.filename
        });
        await banner.save();
        res.status(201).send(banner)
    } catch (error) {
        res.status(500).send({ message: 'Ha ocurrido un error. Intente nuevamente más tarde', error })
    }
}

exports.getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).send(banners);
    } catch (error) {
        res.status(500).send({ message: "Ha ocurrido un error. Vuelva a intentarlo más tarde", error })
    }
}

exports.editBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        const { imageUrl: oldImage } = banner;
        await banner.updateWithRequest(req);
        if (oldImage !== banner.imageUrl) await deleteFile(oldImage);
        res.status(200).send(banner);
    } catch (error) {
        res.status(500).send({ message: 'Ha ocurrido un error. Intente nuevamente más tarde', error })
    }
}

exports.deleteBanner = async ({params: {id}}, res) => {
    try {
        const banner = await Banner.findById(id);
        if (!banner) res.status(400).send('No se encontró el banner');;
        await deleteFile(banner.imageUrl);
        await banner.deleteOne({ _id: id })

        res.status(200).send({ message: 'Se ha eliminado el banner' });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}