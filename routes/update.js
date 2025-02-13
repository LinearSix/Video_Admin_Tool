'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

let records;
// update record
router.post('/update/:id', (req, res, next) => {
    let id = (req.params.id -1);

    fs.readFile('./public/vimeo.json', function read(err, data) {
        if (err) {
            throw err;
        }
        records = JSON.parse(data);    

        // console.log(`body: ${JSON.stringify(req.body)}`);
        let tagsArray = req.body.videoTags.split(',')

        let recordNew = new Object();
        recordNew.videoID = Number(req.body.videoID);
        recordNew.videoName = req.body.videoName;
        recordNew.videoType = req.body.videoType;
        recordNew.videoAdded = req.body.videoAdded;
        recordNew.videoLength = req.body.videoLength;
        recordNew.videoDesc = req.body.videoDesc;
        recordNew.videoURL = req.body.videoURL;
        recordNew.videoTags = tagsArray;
        records.splice(id, 1, recordNew);
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