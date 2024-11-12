const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require('../utils/error');

const crypto = require('crypto');
const secret = 'randomtext';
const hash = crypto.createHmac('sha256', secret).digest('hex');






async function register(req, res, next) {
    try {
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            return next(createError(400, "Email already exists"));
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newUser.save();
        res.status(201).json({ message: "User has been created." });
    } catch (err) {
        next(err);
    }
}










async function logIn(req, res, next) {

    // const emailExist = await User.findOne({ email: req.body.email })
    // if (!emailExist) return res.status(400).send("Email or password is wrong")
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return next(createError(400, "User not found!"))
        }
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, user.password
        )

        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password or username"))
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT)

        const { password, ...otherDetails } = user._doc
        res.cookie("acces_token", token, {
            httpOnly: true,
        }).status(200).json({ ...otherDetails })
    } catch (err) {
        next(err)
    }
}


async function logOut(req, res, next) {
    try {
        res.clearCookie("access_token");
        res.status(200).json("Successfully logged out");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register, logIn, logOut
};
