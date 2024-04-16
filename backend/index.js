import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { PORT } from "./config.js";
import { Book } from "./models/book.model.js";
import multer from "multer";

dotenv.config({ path: "../.env" });

//! Create Express app
const app = express();

//! Middleware to parse JSON bodies
app.use(express.json());
const upload = multer();

//! Define a route
app.get("/", (req, res) => {
  res.send("Hello World 🌍");
});

//! Route for Save a new Book
app.post("/books", upload.single("file"), async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    if (!title || !author || !publishYear) {
      return res
        .status(400)
        .send("title, author, and publishYear are required 📚❌");
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      description: req?.body.description,
      publishYear: req.body.publishYear,
      pages: req?.body.pages,
    };

    const book = await Book.create(newBook);

    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while saving the book 📚❌");
  }
});

//! Route for Get all Books for DB
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while getting the books 📚❌");
  }
});

//! Route for Get a Book by ID
app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send("Book not found 📚❌");
    }
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    const bookTitle = req.body.title || "the book";
    res
      .status(500)
      .send(`An error occurred while getting the  ${bookTitle} 📚❌`);
  }
});

//! Route for Update a Book by ID
app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);

    if (!updatedBook) {
      return res.status(404).send("Book not found 📚❌");
    }

    return res.status(200).json({
      message: "Book updated successfully 📚✅",
      updatedBook,
    });
  } catch (error) {
    // Handle errors and include the book title in the error message
    const bookTitle = req.body.title || "the book";
    res.status(500).send(`An error occurred while updating ${bookTitle} 📚❌`);
  }
});

//! Route for Delete a Book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id, req.body);
    if (!book) {
      return res.status(404).send("Book not found 📚❌");
    }

    return res.status(200).send("Book deleted successfully 📚✅");
  } catch (error) {
    console.log(error);
    res.status(500).send(`An error occurred while deleting book 📚❌`);
  }
});

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
