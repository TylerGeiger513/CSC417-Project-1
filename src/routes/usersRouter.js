const express = require('express');
const usersRouter = express.Router();
const User = require('../models/userModel');


// Create a new user
usersRouter.post('/create', async (req, res) => {
  const { email, name, state, city } = req.body;

  if (!email || !name || !state || !city) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const newUser = new User({ email, name, state, city });
    await newUser.save();

    console.log('New user added:', newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Delete the user with the given ID or email
usersRouter.post('/delete', async (req, res) => {
  const { email, id } = req.body;

  if (!email && !id) {
    return res.status(400).json({ error: 'Either email or id is required.' });
  }

  const query = {};
  if (id) {
    query._id = id;     
  } else if (email) {
    query.email = email; 
  }

  try {
    const deletedUser = await User.findOneAndDelete(query); 

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


// Get all users
usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = usersRouter;
