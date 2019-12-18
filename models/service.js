const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
});

serviceSchema.methods.updateWithRequest = function (req) {
  this.title = req.body.title;
  this.description = req.body.description;
  if(req.file) this.imageUrl = '/imagenes-servicios/' + req.file.filename;
  return this.save();
}

module.exports = mongoose.model('Service', serviceSchema);