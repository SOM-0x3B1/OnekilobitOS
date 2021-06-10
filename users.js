let users = [];

function joinUser(socketId, e_mail, roomName, name) {
    const user = {
        socketID: socketId,
        email: e_mail,
        roomname: roomName,
        name: name             
    }
    users.push(user)
    return user;
}

function removeUser(id) {
    const getID = users => users.socketID === id;
    const index = users.findIndex(getID);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

module.exports = { joinUser, removeUser }