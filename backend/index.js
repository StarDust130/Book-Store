// Import required modules using ES Modules syntax
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {PORT} from "./config.js";

// Load environment variables from .env file
dotenv.config({ path: "../.env" });

// Extract PORT from environment variables


// Create Express app
const app = express();

// Define a route
app.get("/", (req, res) => {
  res.send("Hello World 🌍");
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully 🦄🚀");

    // Start the Express server after successful MongoDB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
