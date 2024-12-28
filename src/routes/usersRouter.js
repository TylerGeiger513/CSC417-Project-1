const express = require('express');
const usersRouter = express.Router();
const defaultUsers = require('../models/defaultUsers');
let users = [];

// Load default users
users = defaultUsers;

// Create a new user
usersRouter.post('/create', (req, res) => {
    const { email, name, state, city } = req.body;

    // Validate user input
    if (!email || !name || !state || !city) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (users.find((user) => user.email === email)) {
        return res.status(400).json({ error: 'User already exists.' });
    }

    const newUser = { email, name, state, city };
    // - will be replaced with the actual database query to insert a new user in future
    const addUser = (user) => {
        users.push(user);
    };
    addUser(newUser);

    res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Get all users
usersRouter.get('/', (req, res) => {
    res.json(users);
});

module.exports = usersRouter;
