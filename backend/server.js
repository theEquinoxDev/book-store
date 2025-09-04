const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
require("dotenv").config();
const cors = require("cors")

connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("API is running"));


app.use("/user", userRoutes);
app.use("/books", bookRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
