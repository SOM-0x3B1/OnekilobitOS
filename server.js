const path = require('path')
const express = require('express');
const app = express();
const http = require('http');
const https = require('https');

const { joinUser, removeUser, findUser } = require('./users'); //import user-related functions
const {toHash} = require('./hash');
const config = require('./config.json');

const fs = require('fs');
const { urlencoded } = require('express');
const privateKey = fs.readFileSync('cert/_.onekilobit.eu-key.pem', 'utf8');
const certificate = fs.readFileSync('cert/_.onekilobit.eu-crt.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app); // The actual app

const mongoose = require('mongoose');
mongoose.connect(config.accURL, { useUnifiedTopology: true, useNewUrlParser: true });
const sema = new mongoose.Schema({
    // 3. feladat
    email: String,
    name: String,
    password: String
});

let modelname = 'Accounts';
const model = mongoose.model(modelname, sema, modelname);


const io = require("socket.io")(httpsServer);


app.use(express.urlencoded({ extended: true }));

// For serving static files
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});
app.get('*', function (req, res) {
    if(req.path.includes('.')){
        res.sendFile(path.join(__dirname + '/public/' + req.path))
    } else{
        res.sendFile(path.join(__dirname + '/public/' + req.path + '.html'))
    }
});


// register
app.post('/register', function (request, response) {
    model.findOne({ email: request.body.email }, function (errors, dokumentum) {
        if (dokumentum) {
            console.log(request.body.email + ' already exists');
            response.redirect('/register.html');
        } else {
            new model({
                email: request.body.email,
                name: request.body.nickname,
                password: request.body.password
            }).save();
            console.log(request.body.email + ' registered');
            response.redirect('/close.html');
        }
    });
});


let thisRoom = "";

// After user connected
io.on("connection", function (socket) {
    socket.on("join room", (data) => {
        // verification, login 
        model.findOne({ email: data.email, password: data.password }, function (error, docs) {
            if (docs) {
                let Newuser = joinUser(socket.id, data.email, docs.name, data.roomName)

                socket.emit('login result', { success: true });
                socket.emit('send data', { id: socket.id, name: Newuser.name });
                console.log(data.email + " connected");

                thisRoom = Newuser.roomname;
                socket.join(Newuser.roomname);
            }
            else {
                socket.emit('login result', { success: false });
                console.log('Invalid login attempt!');
            }
        });

    });

    // Recieve and send message to EVERYONE in the room
    socket.on("chat message", (data) => {
        io.to(thisRoom).emit("chat message", { data: data, id: socket.id });
    });

    // User disconnected
    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user) {
            console.log(user.email + ' has left');
        }
    });
});

// Only to redirect the default http://onekilobit.eu to https://www.onekilobit.eu
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://os." + req.headers['host'] + req.url });
    res.end();
}).listen(80);

httpsServer.listen(443, function () { });