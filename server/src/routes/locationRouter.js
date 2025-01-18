const express = require("express");
const {
  getAllStates,
  getCitiesByState,
} = require("../controllers/locationController");

const locationRouter = express.Router();

locationRouter.get("/states", getAllStates);
locationRouter.get("/cities", getCitiesByState);

module.exports = locationRouter;
