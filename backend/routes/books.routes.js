import { Book } from "../models/book.model.js";
import express from "express";
import multer from "multer";

const router = express.Router();

const upload = multer();

//! Route for Save a new Book
router.post("/", upload.single("file"), async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // This ensures that updatedBook contains the updated document
      runValidators: true, // This ensures Mongoose validators are run on update
    });

    if (!updatedBook) {
      return res.status(404).send("Book not found 📚❌");
    }

    return res.status(200).json({
      message: "Book updated successfully 📚✅",
      updatedBook,
    });
  } catch (error) {
    console.error(`Error updating book:`, error);
    res.status(500).send(`Failed to update book 📚❌`);
  }
});

//! Route for Delete a Book by ID
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found 📚❌");
    }

    return res.status(200).send("Book deleted successfully 📚✅");
  } catch (error) {
    console.log(error);
    res.status(500).send(`An error occurred while deleting book 📚❌`);
  }
});

export default router;
