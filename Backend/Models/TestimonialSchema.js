const mongoose = require('mongoose');

// Define the schema for the testimonial
const testimonialSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,      // Removes any extra spaces
  },
  rating: {
    type: Number,
    min: 1,          // Minimum rating value
    max: 5,          // Maximum rating value
    default: 5,      // Default rating is 5
  },
  name: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,      // Default likes count is 0
  },
}, {
  timestamps: true  // Automatically add createdAt and updatedAt fields
});

// Create the model from the schema
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
