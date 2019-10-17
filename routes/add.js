'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

// render record add page
router.get('/add', (req, res, next) => {

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
        res.render('add', { videoRecords })
    });
});

module.exports = router;