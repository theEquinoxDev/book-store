const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
require("dotenv").config();
const cors = require("cors");

const BookModel = require("./models/Book");

connectDB();

app.use(express.json());
app.use(cors());



app.get("/", (req, res) => res.send("API is running"));

app.use("/images", express.static(__dirname + "/public/images"));

// Routes
app.use("/user", userRoutes);
app.use("/books", bookRoutes);

// Add mock books if none exist
const addMockBooks = async () => {
  const count = await BookModel.countDocuments();
  if (count > 0) return; // Already has books

  const mockBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10.99,
    description: "A novel about the American dream.",
    image: "http://localhost:5000/images/the-great-gatsby.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    price: 8.99,
    description: "Dystopian future ruled by Big Brother.",
    image: "http://localhost:5000/images/1984.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 12.5,
    description: "Classic novel about racial injustice.",
    image: "http://localhost:5000/images/to-kill-a-mockingbird.jpg",
  },
  {
    title: "Harry Potter and the Philospher's Stone",
    author: "J.K. Rowling",
    price: 9.99,
    description: "The start of the magical Harry Potter series.",
    image: "http://localhost:5000/images/harry-potter.jpg",
  },
];


  await BookModel.insertMany(mockBooks);
  console.log("Mock books added!");
};

addMockBooks();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
