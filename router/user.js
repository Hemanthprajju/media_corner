const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
const validationMiddleware = require('../middleware/validation');
const { signUpValidators, signInValidators } = require('../validators/user');

const handleRequest = (handler) => async (req, res, next) => {
    try {
        const result = await handler(req);
        return res.status(200).send(result);
    } catch (err) {
        return next(err);
    }
};

router.post(
    '/signUp',
    signUpValidators,
    validationMiddleware,
    handleRequest(userController.signUp)
);

router.post(
    '/signIn',
    signInValidators,
    validationMiddleware,
    handleRequest(userController.signIn)
);

module.exports = router;
