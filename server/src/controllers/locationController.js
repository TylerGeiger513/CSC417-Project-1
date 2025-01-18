const { State, City } = require("country-state-city-js");

exports.getAllStates = (req, res) => {
  const states = State("US");
  res.json(states);
};

exports.getCitiesByState = (req, res) => {
  const { stateCode } = req.query;

  if (!stateCode) {
    return res.status(400).json({ error: "State code is required." });
  }

  const cities = City("US", stateCode);
  res.json(cities);
};
