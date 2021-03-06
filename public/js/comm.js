let e_mail = '';
let userName = 'John Doe';
let room = 'Room 1';
let ID = '';
let joined = false;
const socket = io();

// recieve data from server.
socket.on('send data', (data) => {
    ID = data.id;
    userName = data.name;
    document.getElementById('lvl').innerText = data.accesslvl;
    let lvlName = document.getElementById('lvlName');
    switch (data.accesslvl) {
        case 1:
            lvlName.innerText = 'Guest';
            break;
        case 2:
            lvlName.innerText = 'User';
            break;
        case 3:
            lvlName.innerText = 'Member';
            break;
        case 4:
            lvlName.innerText = 'Staff';
            break;
        case 5:
            lvlName.innerText = 'Admin';
            break;
    }
});

socket.on('invalid login', (data) => {
    console.log('invalid!');
});


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
        enter.play();

        event.preventDefault();
        e_mail = document.getElementById('email').value;
        let passWord = document.getElementById('password').value;

        if (email.value && passWord) {
            e_mail = document.getElementById('email').value;

            // send event that user has joined room
            socket.emit("join room", { email: e_mail, password: passWord, roomName: room });
        }
        else {
            retryLogin();
        }
    });

socket.on('login result', (data) => {
    if (data.success) {
        closeLogin();
        joined = true;
        showMessenger();
    }
    else
        retryLogin();
});


// recieve any message (including the one we sent)
socket.on("chat message", (data) => {
    displayMessage(data);
});


// update the 
/*socket.on("update lvl", (data) => {
    if(data.accesslvl)
        document.getElementById('lvl').innerText=data.accesslvl;
});
function requestLVL(){
    socket.emit("whatismylevel");
}*/