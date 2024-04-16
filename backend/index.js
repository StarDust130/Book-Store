import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { PORT } from "./config.js";
import bookRoute from "./routes/books.routes.js";
import cors from "cors";

dotenv.config({ path: "../.env" });

//! Create Express app
const app = express();

//! Cors
//? This allow all origins to access the API
// app.use(cors());
//? Allow Custom Orgins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

//! Middleware to parse JSON bodies
app.use(express.json());

//! Use the BookRouters
app.use("/books", bookRoute);

//! Connect to MongoDB using Mongoose
mongoose
  .connect(`${process.env.MONGODB_URL}/bookstore`)
  .then(() => {
    console.log("DB connected successfully 🦄 🥠");

    // Start the Express server after successful MongoDB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
