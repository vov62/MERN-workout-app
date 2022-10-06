const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    })

// static register method
userSchema.statics.register = async function (email, password, name) {

    // validation
    // check if fields are empty
    if (!email || !password || !name) {
        throw Error('Please fill all fields')
    }
    // validation
    // check if the email is a valid email
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    // password validator option 
    const options = {
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10
    }
    const err = 'Password must be 6 character long'

    // validation
    // check if password is strong enough
    if (!validator.isStrongPassword(password, options)) {
        throw Error(err)
    }

    //check if the user already exists in the database or not with findOne db method, use email because email is unique
    // this = refers to the model User.
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already exists')
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create document in the db with the password hash
    const user = await this.create({ name, email, password: hash })

    return user;

}

userSchema.statics.login = async function (email, password) {

    // validation
    // check if fields are empty
    if (!email || !password) {
        throw Error('Please fill all fields')
    }

    //check if the user already exists in the database or not with findOne db method, use email because email is unique
    // this = refers to the model User.
    const user = await this.findOne({ email })


    // validation
    // check if the user is a valid user
    if (!user) {
        throw Error('Incorrect Email or Password')
    }

    // compare the passwords from the db and the entered password 
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect Email or Password')
    }

    // if the password match return the user
    return user;

}

module.exports = mongoose.model('User', userSchema)


