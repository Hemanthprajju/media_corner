const md5 = require('md5');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');

const signUp = async (req) => {
    const { firstName, lastName, role, email, password, address, city, state, zipCode } = req.body;

    if (!email || !password) {
        const error = new Error('Email and password are required');
        error.statusCode = 400;
        throw error;
    }

    const userBody = new userModel({
        firstName,
        lastName,
        role,
        email,
        password: md5(password),
        address,
        city,
        state,
        zipCode
    });

    await userBody.save();

    const user = userBody.toObject();
    delete user.password;

    return {
        message: 'User created successfully',
        data: user
    };
};



module.exports = { signUp };
