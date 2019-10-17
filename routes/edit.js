'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

// render edit page
router.get('/edit/:id', (req, res, next) => {

    let records;
    let videoObject;
    let id = req.params.id
    
    // read the json file
    fs.readFile('./public/vimeo.json', function read(err, editData) {
        if (err) {
            throw err;
        }
        records = JSON.parse(editData);
        // console.log(`records: ${JSON.stringify(records)}`)
    
        videoObject = records.filter(function(r) { return r["videoID"] == id })[0]||null
        let videoRecord = [];
        videoRecord.push(videoObject)

        // console.log(`videoRecord: ${videoRecord}`)
        res.render('edit', { videoRecord })
    });
});

module.exports = router;