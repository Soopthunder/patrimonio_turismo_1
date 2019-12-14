const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  descrition: {
    type: String,
    required: true
  },
  country: {
      type: String,
      required: true,
  },
  imageUrl: {
      type: String,
      required:true
  },
  additionalFile: {
      type: String
  }
});

module.exports = mongoose.model('Destination', destinationSchema);