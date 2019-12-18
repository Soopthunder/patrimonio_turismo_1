module.exports = filePath => {
    const fs = require('fs');
    const createFilePath = require('./createFilePath')

    return new Promise( (resolve, reject) => {
        fs.unlink( createFilePath(filePath), (err) => {
            if (err) reject('Fallo al borrar el archivo');
        });
        resolve();
    })
}