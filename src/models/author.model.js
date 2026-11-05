import mongoose from "mongoose";

const { Schema, model } = mongoose;

const authorSchema = new Schema({
  name: String,
  country: String,
  bio: String,
});

const Author = model("Author", authorSchema);

export default Author;
