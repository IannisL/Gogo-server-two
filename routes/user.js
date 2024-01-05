const express = require('express');

const router = express.Router();


router.get('/', (req, res,) => {
    res.send('sending User info.....');
});


router.post('/create', (req, res) => {
    res.send('Creating a new user ....');
});


module.exports = router;