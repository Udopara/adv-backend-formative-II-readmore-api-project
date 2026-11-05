import Author from "../model/author.model.js";
import Book from "../model/book.model.js"
import mongoose from "mongoose"
import "dotenv/config"



const authors = [
  {
    name: "Chinua Achebe",
    country: "Nigeria",
    bio: "A Nigerian novelist, poet, and critic who is regarded as the dominant figure of modern African literature.",
  },
  {
    name: "Haruki Murakami",
    country: "Japan",
    bio: "A Japanese writer whose novels, essays, and short stories have been bestsellers internationally, often exploring magical realism.",
  },
  {
    name: "Agatha Christie",
    country: "United Kingdom",
    bio: "An English writer known for her 66 detective novels and 14 short story collections, particularly those revolving around Hercule Poirot.",
  },
  {
    name: "Gabriel García Márquez",
    country: "Colombia",
    bio: "A Colombian novelist, short-story writer, screenwriter, and journalist, considered one of the most significant authors of the 20th century.",
  },
];

const books = [
  {
    title: "Things Fall Apart",
    genre: "Historical Fiction",
    price: 15.99,
    publishedYear: "1958",
    author: "Chinua Achebe",
  },
  {
    title: "No Longer at Ease",
    genre: "Fiction",
    price: 14.5,
    publishedYear: "1960",
    author: "Chinua Achebe",
  },
  {
    title: "Norwegian Wood",
    genre: "Romance",
    price: 18.0,
    publishedYear: "1987",
    author: "Haruki Murakami",
  },
  {
    title: "Kafka on the Shore",
    genre: "Magical Realism",
    price: 22.5,
    publishedYear: "2002",
    author: "Haruki Murakami",
  },
  {
    title: "Murder on the Orient Express",
    genre: "Mystery",
    price: 12.99,
    publishedYear: "1934",
    author: "Agatha Christie",
  },
  {
    title: "One Hundred Years of Solitude",
    genre: "Magical Realism",
    price: 20.0,
    publishedYear: "1967",
    author: "Gabriel García Márquez",
  },
];

async function main() {
  for (const author of authors) {
    const createdAuthor = new Author({
      name: author.name,
      country: author.country,
      bio: author.bio,
    });

    await createdAuthor.save();

    const authorBooks = books.filter(
      (book) => book.author === createdAuthor.name,
    );

    for (const book of authorBooks) {
      const createdBook = new Book({
        author: createdAuthor._id,
        genre: book.genre,
        price: book.price,
        title: book.title,
        publishedYear: book.publishedYear,
      });

      await createdBook.save();
    }
  }

  console.log("Seeding complete!");
}

try {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("MongoDB connected successfully");
  await main();
  process.exit();
} catch (error) {
  console.error("MongoDB connection error:", error)
  process.exit(1);
}


