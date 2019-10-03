'use strict';

const express = require('express');
const router = express.Router();

// render index page
router.get('/index', (req, res, next) => {
    res.render('index')
});

module.exports = router;