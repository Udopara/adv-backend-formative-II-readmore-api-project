import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title: String,
  genre: String,
  price: Number,
  publishedYear: String,
  author: String,
});

const Book = model("Book", bookSchema);

export default Book;
