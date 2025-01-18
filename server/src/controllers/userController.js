const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const format = req.query.format;
  
    try {
      const users = await User.find();
  
      if (format === 'json') {
        return res.json(users);
      }
  
      res.status(400).json({ error: 'Invalid format specified. Use ?format=json.' });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.createUser = async (req, res) => {
  const { email, name, state, city } = req.body;

  if (!email || !name || !state || !city) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const newUser = new User({ email, name, state, city });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.deleteUser = async (req, res) => {
  const { email, id } = req.body;

  if (!email && !id) {
    return res.status(400).json({ error: "Either email or id is required." });
  }

  const query = {};
  if (id) query._id = id;
  if (email) query.email = email;

  try {
    const deletedUser = await User.findOneAndDelete(query);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ message: "User deleted successfully.", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
