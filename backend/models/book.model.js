import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "no description",
    },
    publishYear: {
      type: Number,
      required: true,
    },
    pages: {
      type: Number,
      default: "not specified",
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
