const express = require('express');
const { addTestimonial, getTestimonials, likeTestimonial } = require('../Controller/testimonialController');
const createContact = require('../Controller/contactController');

const router = express.Router();

// Route to add a new testimonial
router.post('/add', addTestimonial);

// Route to get all testimonials
router.get('/get', getTestimonials);

router.post('/like', likeTestimonial);
router.post('/contact', createContact);

module.exports=router;