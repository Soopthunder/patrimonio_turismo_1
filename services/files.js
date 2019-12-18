const multer = require('multer');

/**
 * @param destination {String} Folder
 * @param fileTypes {Array} An array of string with files types accepted.
 * @return {Object} An object which you can configure with single and fields functions.
 */
module.exports = (destination, fileTypes) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/'+ destination )
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    });
    
    const fileFilter = (req, file, cb) => {
        fileTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
    };

    return multer({ storage , fileFilter });
};