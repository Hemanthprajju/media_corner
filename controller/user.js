const md5 = require('md5');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');

const signUp = async (req) => {
    const { firstName, lastName, role, email, password, address, city, state, zipCode } = req.body;

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

const signIn = async (req) => {
    const { email, password } = req.body;

    const user = await userModel
        .findOne({ email: email.toLowerCase().trim() })
        .select('+password');

    if (!user || user.password !== md5(password)) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'default_secret_change_me',
        { expiresIn: '7d' }
    );

    const userData = user.toObject();
    delete userData.password;

    return {
        message: 'Sign in successful',
        token,
        data: userData
    };
};

module.exports = { signUp, signIn };
