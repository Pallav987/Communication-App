const users = [];

// Join user to chat

function userJoin(id,username,room){
    const user ={id,username,room};
    users.push(user);
    return user;
}

// Get current user
function getCurrentUser(id){
    return users.find(user => user.id === id)
}

// User leave chat

function userLeave(id){
    const index = users.findIndex(user => user.id === id);
    if(index !== -1){
        return users.splice(index, 1);
    }

}

// To Get room users

function getRoomUers(room){
    return users.filter(user => user.room === room);
}


module.exports = {
    userJoin: userJoin,
    getCurrentUser: getCurrentUser,
    userLeave : userLeave,
    getRoomUers   : getRoomUers,
}