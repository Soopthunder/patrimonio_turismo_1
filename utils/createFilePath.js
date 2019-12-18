const path = require('path');

module.exports = relativePath => path.join(path.dirname(process.mainModule.filename) , 'uploads' , relativePath);