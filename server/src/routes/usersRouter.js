const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUser,
} = require("../controllers/userController");

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/create", createUser);
usersRouter.post("/delete", deleteUser);

module.exports = usersRouter;
