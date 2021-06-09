const path = require('path')
const express = require('express');
const app = express();
const http = require('http');
const https = require('https');

const { joinUser, removeUser, findUser } = require('./users'); //import user-related functions

// Only to redirect the default http://onekilobit.eu to https://www.onekilobit.eu
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://www." + req.headers['host'] + req.url });    
    res.end();
}).listen(80);

const fs = require('fs');
const { urlencoded } = require('express');
const privateKey = fs.readFileSync('cert/_.onekilobit.eu-key.pem', 'utf8');
const certificate = fs.readFileSync('cert/_.onekilobit.eu-crt.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app); // The actual app

const io = require("socket.io")(httpsServer);

app.use(express.urlencoded());

// For serving static files
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/' + req.path))
});

// Login
app.post('/login', function (req, res){
    console.log(req.body);
});


let thisRoom = "";

// After user connected
io.on("connection", function (socket) {   
    socket.on("join room", (data) => {
        console.log(data.username + " connected");
        let Newuser = joinUser(socket.id, data.username, data.roomName)

        // Gives the user an id
        socket.emit('send data', { id: socket.id, username: Newuser.username, roomname: Newuser.roomname });

        thisRoom = Newuser.roomname;
        socket.join(Newuser.roomname);
    });

    // Recieve and send message to EVERYONE in the room
    socket.on("chat message", (data) => {
        io.to(thisRoom).emit("chat message", { data: data, id: socket.id });
    });


    socket.on("login", (data) => {
        console.log(data);
    });

    // User disconnected
    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user) {
            console.log(user.username + ' has left');
        }
    });
});

httpsServer.listen(443, function () { });