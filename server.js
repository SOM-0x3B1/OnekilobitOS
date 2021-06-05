const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { joinUser, removeUser, findUser } = require('./users');

app.use(express.static('public'));

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


http.listen(9000, function () { });