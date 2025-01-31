const Contacts = require("../Models/ContactSchema");

// Controller for handling contact requests
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log("body",req.body);
    // Create a new contact instance
    const newContact = new Contacts({ name, email, subject, message });

    // Save the contact to the database
    await newContact.save();

    // Send a response
    return res.status(201).json({ message: 'Contact submitted successfully!', contact: newContact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Export using ES6 syntax
module.exports=createContact;
