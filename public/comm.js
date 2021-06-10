let e_mail = '';
let userName = 'John Doe';
let room = 'Room 1';
let ID = '';
const socket = io();

// recieve data from server.
socket.on('send data', (data) => {
    ID = data.id;
    userName = data.name;
})

// when form is submitted, capture the input value and then send it to server
document
    .getElementById('mform')
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


// login
document
    .getElementById('loginForm')
    .addEventListener("submit", function (event) {
        event.preventDefault();
        e_mail = document.getElementById('email').value;
        let passWord = document.getElementById('password').value.toHash();

        if (email.value && passWord) {
            e_mail = document.getElementById('email').value;

            // send event that user has joined room
            socket.emit("join room", { email: e_mail, password: passWord, roomName: room });
        }
    });


// recieve any message (including the one we sent)
socket.on("chat message", (data) => {
    displayMessage(data);
});