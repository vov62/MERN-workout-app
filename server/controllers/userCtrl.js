const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // create new document to db with the function that i created in user model
        const user = await User.login(email, password);

        // create Token
        const token = generateToken(user._id);

        // return user email and the user object, the document that created in db
        res.status(201).json({ email, token });
    } catch (err) {
        res.status(404).json({ err: err.message });
    }
}


const registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // create new document to db with the function that i created in user model
        const user = await User.register(email, password, name);

        // create Token
        const token = generateToken(user._id);

        // return user email and the user object, the document that created in db
        res.status(201).json({ email, name, user, token });
    } catch (err) {
        res.status(404).json({ err: err.message });
    }
}


module.exports = { loginUser, registerUser }