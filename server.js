const fs = require('fs');
const path = require('path')
const express = require('express');
const app = express();
const http = require('http');
const https = require('https');

const privateKey = fs.readFileSync('cert/_.onekilobit.eu-key.pem', 'utf8');
const certificate = fs.readFileSync('cert/_.onekilobit.eu-crt.pem', 'utf8');

const { joinUser, removeUser, findUser } = require('./users');
const cookieParser = require('cookie-parser');

const credentials = { key: privateKey, cert: certificate };
const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
    res.end();
});
const httpsServer = https.createServer(credentials, app);
const io = require("socket.io")(httpsServer);

app.use(cookieParser());

/*app.get('/', function (req, res) {
    console.log(req.cookies);

    if (!req.cookies.latogatott) {
        res.cookie('latogatott', '0');
    }
    else {
        let lat = parseInt(req.cookies.latogatott) + 1;
        res.cookie('latogatott', lat.toString());
    }

    res.send();
});*/

app.all('*', function (req, res, next) {    
    var host = req.header("host");
    if (req.subdomains[0]) {
        next();
    } else {
        res.redirect(301, "https://www." + host);
    }
});


app.get('/', function (req, res) {
    if(req.subdomains[0]==='www')
        res.sendFile(path.join(__dirname + '/public-main/main.html'))
    else if(req.subdomains[0]==='os')
        res.sendFile(path.join(__dirname + '/public-os/index.html'));
})

app.get('*', function (req, res) {
    if(req.subdomains[0]==='www')
        res.sendFile(path.join(__dirname + '/public-main/' + req.path))
    else if(req.subdomains[0]==='os')
        res.sendFile(path.join(__dirname + '/public-os/' + req.path))
})


let thisRoom = "";

io.on("connection", function (socket) {
    console.log("connected");

    socket.on("join room", (data) => {
        console.log('in room');
        let Newuser = joinUser(socket.id, data.username, data.roomName)

        socket.emit('send data', { id: socket.id, username: Newuser.username, roomname: Newuser.roomname });

        thisRoom = Newuser.roomname;
        console.log(Newuser);
        socket.join(Newuser.roomname);
    });

    socket.on("chat message", (data) => {
        io.to(thisRoom).emit("chat message", { data: data, id: socket.id });
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        console.log(user);
        if (user) {
            console.log(user.username + ' has left');
        }
        console.log("disconnected");
    });
});


httpServer.listen(80, function () { });
httpsServer.listen(443, function () { });