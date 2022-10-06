const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {

    // verify authentication 
    const { authorization } = req.headers;

    // check if authorization that sent by the user has value
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    // if authorization has value we get the token and split it so we get only the number 
    const token = authorization.split(' ')[1]

    try {

        //we grab the id from token
        const { _id } = jwt.verify(token, process.env.REACT_JWT_SECRET)

        //find the user by ID leave the rest properties, we d'ont need them from DB 
        req.user = await User.findOne({ _id }).select('_id');
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' })

    }
}

module.exports = { protect }
