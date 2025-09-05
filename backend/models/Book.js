const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new Schema ({
    title: {type: String, required: true},
    author: {type: String, required: true},
    price: {type: Number, required: true},
    description: String,
    image: String,
    userId: { type: ObjectId, ref: "Users" }
});

const BookModel = mongoose.model("books", bookSchema);

module.exports = BookModel;