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
    router.get('/update/:id', (req, res, next) => {
        let id = req.params.id
        let videoObject = records.filter(function(r) { return r["videoID"] == id })[0]||null
        let videoRecord = [];
        videoRecord.push(videoObject)
        console.log(videoRecord)
        res.render('edit', { videoRecord })
    });

});

module.exports = router;