'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');


// add new record and render index page
router.post('/submit', (req, res, next) => {

    let records;

    fs.readFile('./public/vimeo.json', function read(err, data) {
        if (err) {
            throw err;
        }
        records = JSON.parse(data);
        let id = records.length;

        // console.log(`body: ${JSON.stringify(req.body)}`);
        let tagsArray = req.body.videoTags.split(',')

        let recordNew = new Object();
        recordNew.videoID = (id + 1);
        recordNew.videoName = req.body.videoName;
        recordNew.videoType = req.body.videoType;
        recordNew.videoAdded = req.body.videoAdded;
        recordNew.videoLength = req.body.videoLength;
        recordNew.videoDesc = req.body.videoDesc;
        recordNew.videoURL = req.body.videoURL;
        recordNew.videoTags = tagsArray;
        records.splice(id, 0, recordNew);
        fs.writeFile('./public/vimeo.json', JSON.stringify(records), (err) => {
            // console.log(recordNew);
        });

        // let videoRecords = [];
        // for (let item in records) {
        //     videoRecords.push(records[item])
        // };        
        // console.log(videoRecords)
        res.redirect('/index')
    });

});

module.exports = router;