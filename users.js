let users = [];

function getIndex(id){
    let getID = users => users.socketID === id;
    return users.findIndex(getID);
}

function joinUser(socketId, email, name, roomname, accessLVL) {
    const user = {
        socketID: socketId,
        email: email,        
        name: name,
        roomname: roomname,
        lvl: accessLVL
    }
    users.push(user)
    return user;
}

function removeUser(id) {
    let index = getIndex(id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

/*function findUserLVL(id){
    let index = getIndex(id);
    return users[index].lvl;
}*/

module.exports = { joinUser, removeUser/*, findUserLVL*/ }