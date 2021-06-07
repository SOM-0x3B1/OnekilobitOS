let userName = "Soma";
let room = "Room 1";
let ID = "";
const socket = io();

// send event that user has joined room
socket.emit("join room", { username: userName, roomName: room });


// recieve id from server.
socket.on('send data', (data) => {
    ID = data.id;
})


// when form is submitted, capture the input value and then send it to server
document
    .getElementsByTagName("form")[0]
    .addEventListener("submit", function (event) {
        event.preventDefault();
        let msg = document.getElementById("m");
        if (msg.value) {
            socket.emit("chat message", {
                value: msg.value,
                user: userName
            });
        }
        msg.value = "";
        msg.focus();
    });

    
// recieve any message (including the one we sent)
socket.on("chat message", (data) => {
    displayMessage(data);
});