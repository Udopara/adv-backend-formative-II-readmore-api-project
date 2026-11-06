import express from "express";
import { getAuthors, getAuthorbyId, deleteAuthor, createAuthor, updateAuthor, getBooksbyAuthor } from "../controllers/author.controller.js";

const router = express.Router()

router.get("/", getAuthors)

router.get("/:id", getAuthorbyId);

router.delete("/:id", deleteAuthor)

router.post("/", createAuthor)

router.put("/:id", updateAuthor);

router.get("/:id/books", getBooksbyAuthor);

export default router