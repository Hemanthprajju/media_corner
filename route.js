const express = require('express');
const router = express();

router.use('/user', require('./router/user'));

module.exports = router;
