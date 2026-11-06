import Book from "../models/book.model.js";
import Author from "../models/author.model.js";
import { buildErrorMessage } from "../libs/utils.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).populate("author");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(buildErrorMessage(error.message));
  }
};

export const getBookbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).populate("author").exec();
    if (!book) {
      return res
        .status(404)
        .json(buildErrorMessage(`Book with id: ${id} not found`));
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(buildErrorMessage(error.message));
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).exec();
    if (!book) {
      return res
        .status(404)
        .json(buildErrorMessage(`No book with id: ${id} found`));
    }
    await Book.deleteOne({ _id: id });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json(buildErrorMessage(error.message));
  }
};

export const createBook = async (req, res) => {
  const { title, genre, price, publishedYear, author } = req.body;

  if (!title || !genre || !price || !publishedYear || !author) {
    return res
      .status(422)
      .json(
        buildErrorMessage(
          "All fields - title, genre, price, publishedYear and author are required.",
        ),
      );
  }


  try {
    const authorDoc = await Author.findById(author).exec();
    if (!authorDoc) {
      return res
        .status(404)
        .json(buildErrorMessage(`Author with id: ${author} not found`));
    }
    const book = new Book({ title, genre, price, publishedYear, author });
    
    await book.save();
    await book.populate("author");
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json(buildErrorMessage(error.message));
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, genre, price, publishedYear, author } = req.body;

  if (!title && !genre && !price && !publishedYear && !author) {
    return res
      .status(422)
      .json(
        buildErrorMessage(
          "No fields to update: provide at least one of title, genre, price, publishedYear or author.",
        ),
      );
  }

  try {
    if (author) {
      const authorDoc = await Author.findById(author).exec();
      if (!authorDoc) {
        return res
          .status(404)
          .json(buildErrorMessage(`Author with id: ${author} not found`));
      }
    }
    
    const book = await Book.findById(id);

    if (!book) {
      return res
        .status(404)
        .json(buildErrorMessage(`No book with id: ${id} found`));
    }

    book.title = title ?? book.title;
    book.genre = genre ?? book.genre;
    book.price = price ?? book.price;
    book.publishedYear = publishedYear ?? book.publishedYear;
    book.author = author ?? book.author;

    await book.save();
    await book.populate("author");
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(buildErrorMessage(error.message));
  }
};
