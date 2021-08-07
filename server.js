const path = require('path')
const express = require('express');
const app = express();
const http = require('http');
const https = require('https');

const { joinUser, removeUser/*, findUserLVL*/ } = require('./users'); //import user-related functions
const { toHash } = require('./hash');
const config = require('./config.json');

const fs = require('fs');
const { urlencoded } = require('express');
const privateKey = fs.readFileSync('cert/_.onekilobit.eu-key.pem', 'utf8');
const certificate = fs.readFileSync('cert/_.onekilobit.eu-crt.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app); // The actual app

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: config.passwd,
    database: "onekilobit"
});
con.connect(function (err) {
    if (err) throw err;
});

const io = require("socket.io")(httpsServer);


app.use(express.urlencoded({ extended: true }));

// For serving static files
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});
app.get('*', function (req, res) {
    if (req.path.includes('.')) {
        res.sendFile(path.join(__dirname + '/public/' + req.path))
    } else {
        res.sendFile(path.join(__dirname + '/public/' + req.path + '.html'))
    }
});


// register
app.post('/register', function (request, response) {
    /*model.findOne({ email: request.body.email }, function (errors, dokumentum) {
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
    });*/
    con.query("SELECT * FROM user WHERE email = ?", [request.body.email], function (err, result) {
        if (err) {
            console.log(err);
        }
        else if (result.length == 0) {
            con.query("INSERT INTO user (email, username, password) VALUES (?, ?, ?)", [request.body.email, request.body.nickname, request.body.password], function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });

            console.log(request.body.email + ' registered.');
            response.redirect('/close.html');
        }
        else {
            console.log(result);
            console.log(request.body.email + ' already exists');
            response.redirect('/register.html');
        }
    });
});


let thisRoom = "";

// After user connected
io.on("connection", function (socket) {
    socket.on("join room", (data) => {
        // verification, login 
        /*model.findOne({ email: data.email, password: data.password }, function (error, docs) {
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
        });*/

        con.query("SELECT * FROM user WHERE email = ? AND password = ?", [data.email, data.password], function (err, result) {
            if (result.length == 0) {
                socket.emit('login result', { success: false });
                console.log('Invalid login attempt from: ' + data.email);
            }
            else if (err) {
                console.log(err);
            }
            else {
                let dbuser = result[0];
                let Newuser = joinUser(socket.id, data.email, dbuser.username, data.roomName, dbuser.accesslvl)

                socket.emit('login result', { success: true });
                socket.emit('send data', { id: socket.id, name: Newuser.name, accesslvl:Newuser.lvl });
                console.log(data.email + " connected");

                thisRoom = Newuser.roomname;
                socket.join(Newuser.roomname);
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

    /*socket.on("whatismylevel", () => {        
        let lvl = findUserLVL(socket.id);
        if (lvl) {
            socket.emit('update lvl', { accesslvl: lvl });
        }
        console.log('lvl: ' + lvl);
    });*/
});

// Only to redirect the default http://onekilobit.eu to https://www.onekilobit.eu
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://os." + req.headers['host'] + req.url });
    res.end();
}).listen(80);

httpsServer.listen(443, function () { });