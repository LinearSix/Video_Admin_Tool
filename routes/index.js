'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

let records;
// First I want to read the file
fs.readFile('./public/vimeo.json', function read(err, data) {
    if (err) {
        throw err;
    }
    records = JSON.parse(data);

    // Invoke the next step here however you like
    // console.log(records);   // Put all of the code here (not the best solution)


    // render edit page
    router.get('/index', (req, res, next) => {
        let videoRecords = [];
        for (let item in records) {
            videoRecords.push(records[item])
        };        
        // console.log(videoRecords)
        res.render('index', { videoRecords })
    });

});

module.exports = router;