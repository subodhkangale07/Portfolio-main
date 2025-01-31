const mongoose = require('mongoose');

// Define the Contact schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
}, { timestamps: true });

// Create the Contact model
const Contacts = mongoose.model('Contacts', contactSchema);

module.exports=Contacts;
