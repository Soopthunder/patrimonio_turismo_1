const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone : {
    type: String
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  readed: {
    type: Boolean,
    default: false
  },
  creationDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);