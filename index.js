const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2502;
require('dotenv').config()
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
// const knex = require('./db/knex');

// use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the folder for ejs files
app.set('views', path.join(__dirname, 'views'));

// Set the folder for public content
app.use(express.static(path.join(__dirname, 'public')))

// set the folder for npm packages
app.use(express.static(path.join(__dirname, 'node_modules')))

// set the favicon file
app.use(favicon(path.join(__dirname,'public','favicon.ico')));

// Set the view engine to ejs
app.set('view engine', 'ejs')

// set express routes
const route_index = require('./routes/index');
const route_edit = require('./routes/edit');
const route_update = require('./routes/update');
const route_add = require('./routes/add');
const route_submit = require('./routes/submit');
const route_delete = require('./routes/delete');

// use express routes
app.use(route_index);
app.use(route_edit);
app.use(route_update);
app.use(route_add);
app.use(route_submit);
app.use(route_delete);

// set redirect for users adding a /
app.get('/', function(req, res){ res.redirect('index')});

app.use((_req, res) => {
    res.sendStatus(404);
});
  
app.use((err, _req, res, _next) => {
if (err.status) {
    return res
    .status(err.status)
    .set('Content-Type', 'text/plain')
    .send(err.message);
}

console.error(err.stack);
res.sendStatus(500);
});
  
// start server
app.listen(PORT, function() {
console.log("listening on port: ", PORT);
});

module.exports = app;