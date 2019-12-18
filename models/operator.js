const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deleteFile = require('../utils/deletefile');

const opearatorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  catalogs: [{
    title: String,
    catalog: String
  }]
});

opearatorSchema.methods.updateWithRequest = function (req) {
  this.name = req.body.name;
  if (req.file) this.imageUrl = '/imagenes-operadores/' + req.file.filename;
  return this.save();
}

opearatorSchema.methods.addCatalog = function (catalog) {
  this.catalogs.push(catalog);
  return this.save();
}

opearatorSchema.methods.deleteFiles = async function () {
  try {
    await deleteFile(this.imageUrl);
    for (let i = 0; i < this.catalogs.length; i++) {
      console.log(this.catalogs[i].catalog);
      await deleteFile(this.catalogs[i].catalog);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = mongoose.model('Operator', opearatorSchema);