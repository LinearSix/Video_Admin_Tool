'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

// render index page
router.get('/index', (req, res, next) => {

    let records;

    // read the json file
    fs.readFile('./public/vimeo.json', function read(err, editData) {
        if (err) {
            throw err;
        }
        records = JSON.parse(editData);
        let videoRecords = [];
        for (let item in records) {
            videoRecords.push(records[item])
        };
        
        // console.log(videoRecords)
        res.render('index', { videoRecords })
    });
});

module.exports = router;