const Destination = require('../models/destination');
const deleteFile = require('../utils/deletefile');

exports.createDestination = async ({ body: { title, description, popular, continent, region, country, airport, departureDate, price, duration, food, type }, files: { image, pdf, gallery } }, res) => {
    try {
        const destination = new Destination({
            title, description, continent, region: region ? region.replace(' ', '') : null , country, popular,
            airport, departureDate, price, duration, food, type,
            imageUrl: '/archivos-destinos/' + image[0].filename,
            pdfUrl: pdf ? '/archivos-destinos/' + pdf[0].filename : null,
            gallery: gallery ? gallery.map(image => '/archivos-destinos/' + image.filename) : [],
            creationDate: new Date()
        });
        await destination.save();
        res.status(201).send(destination)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Ha ocurrido un error. Intente nuevamente más tarde', error })
    }
}

exports.editDestination = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        const { imageUrl: oldImage, pdfUrl: oldFile } = destination;
        await destination.updateWithRequest(req);
        if (oldImage !== destination.imageUrl) await deleteFile(oldImage);
        if (oldFile !== destination.pdfUrl) await deleteFile(oldFile);
        res.status(200).send(destination);
    } catch (error) {
        res.status(500).send({ message: 'Ha ocurrido un error. Intente nuevamente más tarde', error })
    }
};

exports.deleteDestination = async ({ params: { id } }, res) => {
    try {
        const destination = await Destination.findById(id);
        if (!destination) throw new Error('No se encontró el destino');
        await deleteFile(destination.imageUrl);
        if (destination.pdfUrl) await deleteFile(destination.pdfUrl);
        if (destination.gallery) {
            for (image of destination.gallery) await deleteFile(image);
        }
        await Destination.deleteOne({ _id: id })

        res.status(200).json({ message: 'Se ha eliminado el destino' });
    } catch (error) {
        res.status(500).send({ message: "Ha ocurrido un error. Vuelva a intentarlo más tarde", error })
    }
};

exports.deleteGalleryImage = async ({ body, params: { id } }, res) => {
    try {
        const destination = await Destination.findById(id)
        destination.gallery = destination.gallery.filter(img => img !== body.image);
        await deleteFile(body.image);
        const updated = await destination.save();
        res.status(200).send(updated.gallery);
    } catch (error) {
        res.status(500).send({ message: "Ha ocurrido un error. Vuelva a intentarlo más tarde", error })
    }
}

exports.getDestinations = async ({query}, res) => {
    try {
        const destinations = await Destination.find(query);
        res.status(200).send(destinations);
    } catch (error) {
        res.status(500).send({ message: "Ha ocurrido un error. Vuelva a intentarlo más tarde", error })
    }
}

exports.getLastDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find()
            .limit(5)
            .sort({ _id: -1 });
        res.status(200).send(destinations);
    } catch (error) {
        res.status(500).send({ message: "Ha ocurrido un error. Vuelva a intentarlo más tarde", error })
    }
}