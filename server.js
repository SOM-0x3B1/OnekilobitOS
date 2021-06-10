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

const mongoose = require('mongoose');
mongoose.connect(config.accURL, { useUnifiedTopology: true, useNewUrlParser: true });
const sema = new mongoose.Schema({
    // 3. feladat
    email: String,
    name: String,
    password: String
});
const modelname = 'Accounts';
const model = mongoose.model(modelname, sema, modelname);


const io = require("socket.io")(httpsServer);


app.use(express.urlencoded());

// For serving static files
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/' + req.path))
});


// register
app.post('/register', function (request, response){
    model.findOne({ email: request.body.email}, function (errors, dokumentum) {
		if (dokumentum) {
			
		} else {
			new model({
				email: request.body.email,
                name: request.body.name,
				password: request.body.password				
			}).save();
		}
	});
	response.redirect('jelentkezesek.html');
});


let thisRoom = "";

// After user connected
io.on("connection", function (socket) {
    socket.on("join room", (data) => {

        // verification, login 
        model.find({ email: data.email, password: data.password }, function (error, docs) {
            if (!error) {
                let Newuser = joinUser(socket.id, data.email, docs.name, data.roomName)
                socket.emit('send data', { id: socket.id, name: Newuser.name });
                console.log(data.email + " connected");

                thisRoom = Newuser.roomname;
                socket.join(Newuser.roomname);
            }
            else {
                socket.emit('invalid login');
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

httpsServer.listen(443, function () { });