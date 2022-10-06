const userRouter = require('express').Router();
const { loginUser, registerUser } = require('../controllers/userCtrl');


userRouter.post('/login', loginUser);

userRouter.post('/register', registerUser);


module.exports = userRouter;
