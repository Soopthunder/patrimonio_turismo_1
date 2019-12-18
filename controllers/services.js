const Service = require('../models/service');
const deleteFile = require('../utils/deletefile');

exports.addService = async ({body:{ title, description}, file: image }, res) => {
    try {
        const service = new Service({
            title, description, imageUrl: '/imagenes-servicios/' + image.filename
        });
        await service.save();
        res.status(201).send(service)
    } catch (error) {
        res.status(500).send({ message: 'Ha ocurrido un error. Intente nuevamente más tarde', error })
    }
}

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send({ message: "Ha ocurrido un error. Vuelva a intentarlo más tarde", error })
    }
}

exports.editService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        const { imageUrl: oldImage } = service;
        await service.updateWithRequest(req);
        if (oldImage !== service.imageUrl) await deleteFile(oldImage);
        res.status(200).send(service);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Ha ocurrido un error. Intente nuevamente más tarde', error })
    }
}

exports.deleteService = async ({params: {id}}, res) => {
    try {
        const service = await Service.findById(id);
        if (!service) throw new Error('No se encontró el servicio');
        await deleteFile(service.imageUrl);
        await Service.deleteOne({ _id: id })

        res.status(200).json({ message: 'Se ha eliminado el servicio' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Ha ocurrido un error. Vuelva a intentarlo más tarde", error })
    }
}