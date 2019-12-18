const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'regions.json');

exports.getRegions =  (req, res) => {
    fs.readFile( filePath, (error, data) => {
        if (error) return res.status(500).send({ error });
        res.status(200).send(JSON.parse(data));
    });
};

exports.updateRegions =  (req, res) => {
    const content =JSON.stringify(req.body)
    fs.writeFile(filePath, content , (error) =>{
        if (error) return res.status(500).send({ error });
        res.status(200).send({message:"Las regiones se han actualziado"});
    })
}