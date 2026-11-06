import Author from "../models/author.model.js";
import Book from "../models/book.model.js";
import { buildErrorMessage } from "../libs/utils.js";

export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json(buildErrorMessage(error.message));
  }
};

export const getAuthorbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findById(id).exec();
    if (!author) {
      return res
        .status(404)
        .json(buildErrorMessage(`Author with id: ${id} not found`));
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json(buildErrorMessage(error.message));
  }
};

export const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findById(id).exec();
    if (!author) {
      return res
        .status(404)
        .json(buildErrorMessage(`No author with id: ${id} found`));
    }
    await Author.deleteOne({ _id: id });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json(buildErrorMessage(error.message));
  }
};

export const createAuthor = async (req, res) => {
  const { name, country, bio } = req.body;

  if (!name || !country) {
    return res
      .status(422)
      .json(
        buildErrorMessage(
          "Missing required fields: name and country are required.",
        ),
      );
  }

  try {
    const author = new Author({
      name,
      country,
      bio,
    });

    await author.save();

    res.status(201).json(author);
  } catch (error) {
    res.status(500).json(buildErrorMessage(error.message));
  }
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, country, bio } = req.body;

  if (!name && !country && !bio) {
    return res
      .status(422)
      .json(
        buildErrorMessage(
          "No fields to update: provide at least one of name, country, or bio.",
        ),
      );
  }

  try {
    const author = await Author.findById(id);

    if (!author) {
      return res
        .status(404)
        .json(buildErrorMessage(`No author with id: ${id} found`));
    }

    author.name = name ?? author.name;
    author.bio = bio ?? author.bio;
    author.country = country ?? author.country;

    await author.save();

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json(buildErrorMessage(error.message));
  }
};

export const getBooksbyAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findById(id).exec();
    if (!author) {
      return res
        .status(404)
        .json(buildErrorMessage(`Author with id: ${id} not found`));
    }

    const books = await Book.find({ author: id }).populate("author");

    return res.status(200).json(books);
  } catch (error) {
    res.status(500).json(buildErrorMessage(error.message));
  }
};
