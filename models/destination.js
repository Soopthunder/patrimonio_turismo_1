const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  continent: {
    type: String,
  },
  region: {
    type: String,
  },
  country: {
    type: String,
  },
  popular: {
    type: Boolean,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  pdfUrl: {
    type: String
  },
  gallery: {
    type: Array,
    default: []
  },
  creationDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number
  },
  duration: {
    type: String
  },
  airport: {
    type: String
  },
  departureDate: {
    type: Date
  },
  food: {
    type: String
  },
  type: {
    type: String,
    required: true
  }
});

destinationSchema.methods.updateWithRequest = function (req) {
  this.title = req.body.title;
  this.continent = req.body.continent;
  this.region = req.body.region;
  this.country = req.body.country;
  this.popular = req.body.popular;
  this.description = req.body.description;
  this.departureDate = req.body.departureDate;
  this.food = req.body.food;
  this.duration = req.body.duration;
  this.airport = req.body.airport;
  this.price= req.body.price;
  this.type = req.body.type;
  if (req.files.image) this.imageUrl = '/archivos-destinos/' + req.files.image[0].filename;
  if (req.files.pdf) this.pdfUrl = '/archivos-destinos/' + req.files.pdf[0].filename;
  if (req.files.gallery) {
    req.files.gallery.forEach(image => this.gallery.push('/destinos/' + image.filename))
  }
  return this.save();
}

module.exports = mongoose.model('Destination', destinationSchema);