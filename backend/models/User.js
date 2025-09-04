const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

const UserModel = mongoose.model("Users", userSchema); // will create the collection named Users in the mongoDB database. 

module.exports = UserModel;