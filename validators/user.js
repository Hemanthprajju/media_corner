const { body } = require('express-validator');
const userModel = require('../model/user');

const signUpValidators = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('role').trim().notEmpty().withMessage('Role is required'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email must be valid')
        .bail()
        .custom(async (email) => {
            const existingUser = await userModel.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('zipCode').trim().notEmpty().withMessage('Zip code is required')
];

const signInValidators = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters')
];

module.exports = {
    signUpValidators,
    signInValidators
};
