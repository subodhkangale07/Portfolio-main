const Testimonial = require("../Models/TestimonialSchema");

// Function to add a new testimonial
const addTestimonial = async (req, res) => {
  try {
    // Get the testimonial data from the request body
    const { content, rating, name, role, likes } = req.body;

    // Create a new testimonial instance
    const newTestimonial = new Testimonial({
      content,
      rating,
      name,
      role,
      likes,
    });

    // Save the testimonial to the database
    const savedTestimonial = await newTestimonial.save();

    // Send the saved testimonial as a response
    res.status(201).json({
      message: 'Testimonial added successfully!',
      testimonial: savedTestimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to add testimonial',
      error: error.message,
    });
  }
};

// Function to get all testimonials
const getTestimonials = async (req, res) => {
  try {
    // Fetch all testimonials from the database
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }); // Sort by newest first

    // Send the testimonials as a response
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch testimonials',
      error: error.message,
    });
  }
};
const likeTestimonial = async (req, res) => {
    try {
      const { id } = req.body; // Get the testimonial ID from the request parameters
      console.log("id is here",id);
      // Find the testimonial by ID and increment the likes
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(
        {_id:id},
        { $inc: { likes: 1 } }, // Increment likes by 1
        { new: true } // Return the updated document
      );
  
      // Check if the testimonial was found and updated
      if (!updatedTestimonial) {
        return res.status(404).json({
          message: 'Testimonial not found',
        });
      }
  
      // Send the updated testimonial as a response
      res.status(200).json({
        message: 'Testimonial liked successfully!',
        testimonial: updatedTestimonial,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to like testimonial',
        error: error.message,
      });
    }
  };
  
  module.exports = { addTestimonial, getTestimonials, likeTestimonial };
