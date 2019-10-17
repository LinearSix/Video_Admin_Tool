'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

// delete record and render index page
router.get('/delete/:id', (req, res, next) => {

    let records;
    let id = (req.params.id - 1);

    fs.readFile('./public/vimeo.json', function read(err, data) {
        if (err) {
            throw err;
        }
        records = JSON.parse(data);
        records.splice(id, 1);
        fs.writeFile('./public/vimeo.json', JSON.stringify(records), (err) => {
        });

        let videoRecords = [];
        for (let item in records) {
            videoRecords.push(records[item])
        };        
        // console.log(videoRecords)
        res.redirect('/index')
    });
});

module.exports = router;