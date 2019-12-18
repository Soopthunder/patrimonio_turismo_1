const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gaLLeryImageSchema = new Schema({
  imageUrl: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Gallery Images', gaLLeryImageSchema);