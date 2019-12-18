const Operator = require("../models/operator");
const deleteFile = require('../utils/deletefile');

exports.getOperators = async (req, res) => {
    try {
        const operators = await Operator.find();
        res.status(200).send(operators);
    } catch (error) {
        res.satus(500).send(JSON.stringify(error));
    }
}

exports.createOperator = async ({ body, file }, res) => {
    try {
        const operator = new Operator({ ...body, imageUrl: "/imagenes-operadores/" + file.filename });
        await operator.save();
        res.status(201).send(operator);
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
};

exports.editOperator = async (req, res) => {
    try {
        const operator = await Operator.findById(req.params.id);
        const { imageUrl: oldImage } = operator;
        await operator.updateWithRequest(req);
        if (oldImage !== operator.imageUrl) await deleteFile(oldImage);
        res.status(200).send(operator);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.addCatalog = async ({ body: { title }, file, params: { id } }, res) => {
    try {
        const operator = await Operator.findById(id);
        const updatedOperator = await operator.addCatalog({ title, catalog: "/catalogos/" + file.filename });
        res.status(201).send(updatedOperator.catalogs);
    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify(error));
    }
};

exports.deleteOperator = async ({ params: { id } }, res) => {
    try {
        const operator = await Operator.findById(id);
        if (!operator) res.status(400).send('No se encontró el operador');
        await operator.deleteFiles()
        await operator.deleteOne({ _id: id });

        res.status(200).send({ message: 'Se ha eliminado el operador' });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}