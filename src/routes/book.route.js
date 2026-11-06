import express from "express";
import { getBooks, getBookbyId, deleteBook, createBook, updateBook } from "../controllers/book.controller.js";

const router = express.Router()

router.get("/", getBooks)

router.get("/:id", getBookbyId);

router.delete("/:id", deleteBook)

router.post("/", createBook)

router.put("/:id", updateBook);

export default router