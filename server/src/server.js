const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require("./db/connectToDatabase");
const usersRouter = require("./routes/usersRouter");
const locationRouter = require("./routes/locationRouter");
const seedDatabase = require("./seed");
require("dotenv").config();

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB");


    await seedDatabase();
    console.log("Database seeding completed");

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    // API Routes
    app.use("/api/users", usersRouter);
    app.use("/api/locations", locationRouter);

    const PORT = process.env.SERVER_PORT || 3000;
    const HOST = process.env.SERVER_HOST || "http://localhost";
    app.listen(PORT, () => {
      console.log(`Server running at ${HOST}:${PORT}`);
      console.log(`Database connected at ${process.env.MONGO_URL}`);
    });

    // Health check endpoint so that client can check if the server is running
    app.get('/api/health', (req, res) => {
      res.status(200).send('OK');
    });

  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
