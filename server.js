const express = require('express');
//const favicon = require('serve-favicon');

const path = require('path');

const app = express();


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/' + req.path))
})


app.listen(9000);