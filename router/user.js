const express = require('express');
const router = express();

const userController = require('../controller/user');

const handleRequest = (handler) => (req, res) => {
    handler(req)
        .then((result) => res.status(200).send(result))
        .catch((err) => {
            res.status(err.statusCode || 500).send({
                message: err.message || 'Request failed'
            });
        });
};

router.post('/signUp', handleRequest(userController.signUp));

module.exports = router;
