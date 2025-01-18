const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require("./db/connectToDatabase");
const usersRouter = require("./routes/usersRouter");
const locationRouter = require("./routes/locationRouter");
const seedDatabase = require("./seed");

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

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
