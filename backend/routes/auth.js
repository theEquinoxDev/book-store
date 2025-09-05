const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

router.post("/register", async function(req, res) {
    const {username, email, password} = req.body;

    const existingUser = await UserModel.findOne({email});

    if(existingUser) {
        return res.status(400).json({
            message: "User Already Exists"
        });
    }

     const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashed = await bcrypt.hash(password, 11);
    const newUser = new UserModel({
        username, 
        email,
        password: hashed
    });

    await newUser.save();
    res.json({
        message: "User registered successfully."
    });
});

router.post("/login", async function (req, res) {
    const {email, password} = req.body;

    const user = await UserModel.findOne({email});
    if(!user) {
        return res.status(400).json({
            message: "User does not exists!"
        });
    };
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

    res.json({
        message: "User Logged in Successfully", token
    });
});

module.exports = router