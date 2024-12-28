const express = require('express');
const locationRouter = express.Router();
const { State, City } = require('country-state-city-js');

// Get all states
locationRouter.get('/states', (req, res) => {
  const states = State('US'); 
  res.json(states);
});

// Get cities for a specific state
locationRouter.get('/cities', (req, res) => {
  const { stateCode } = req.query;

  if (!stateCode) {
    return res.status(400).json({ error: 'State code is required.' });
  }

  const cities = City('US', stateCode) 
  res.json(cities);
});

module.exports = locationRouter;
