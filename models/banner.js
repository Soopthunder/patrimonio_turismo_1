const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
});

bannerSchema.methods.updateWithRequest = function (req) {
  this.title = req.body.title;
  if(req.file) this.imageUrl = '/imagenes-banners/' + req.file.filename;
  return this.save();
}

module.exports = mongoose.model('Banner', bannerSchema);