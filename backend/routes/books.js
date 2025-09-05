const express = require("express");
const router = express.Router();
const BookModel = require("../models/Book");
const authenticationMiddlware = require("../middleware/authMiddleware")


router.post("/", authenticationMiddlware, async function(req, res) {
    const {title, author, price, description, image} = req.body;
    const userId = req.userId;
    const newBook = await BookModel.create({title, author, price, description, image, userId});
    res.json({
        message: "Book Uploaded!", 
        Book : newBook
    });
});

router.get("/", async function(req, res) {
    
    const books = await BookModel.find();

    res.json({books});
})

router.put("/update/:id", authenticationMiddlware, async function(req, res) {
    const id = req.params.id;
    const {title, author, price, description} =  req.body;
    const updatedBook = await BookModel.findByIdAndUpdate(id, { title, author, price, description}, {new:true});

    res.json({
        message: "Book Updated Successfully",
        updatedBook : updatedBook,
    });
});

router.delete("/delete/:id", authenticationMiddlware, async function(req, res) {
    const id = req.params.id;
    const deleteBook = await BookModel.findByIdAndDelete(id);

    if(!deleteBook) {
       return res.json({
            message: "Book Not Found"
        })
    }

    res.json({
        message: "Book Deleted Successfully!"
    });
});

module.exports = router;