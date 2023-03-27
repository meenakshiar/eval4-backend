const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models/userModel');
const { Router } = require('express');
const userRoute = Router();

userRoute.post('/register', async (req, res) => {
    const { name, email, gender, password, age, city, is_married } = req.body;
    const user = await User.find({ email });
    if (user.length <= 0) {
        try {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.send({ msg: "Something went Wrong", error: err.message });
                } else {
                    const user = new User({
                        name,
                        email,
                        gender,
                        password: hash,
                        age,
                        city,
                        is_married
                    });
                    await user.save();
                    res.send({ msg: "New user has been registered" });
                }
            });
        } catch (error) {
            res.send({ msg: "Something went Wrong", error: error.message });
        }
    } else {
        res.send({ msg: "User already exist, please login" });
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user[0]._id }, process.env.JWT_KEY);
                    res.send({ msg: "Logged in ", token: token });
                }
            });
        } else {
            res.send({ msg: "Wrong credentials" });
        }
    } catch (error) {
        res.send({ msg: "Something went wrong", error: error.message });
    }
});

module.exports = { userRoute };