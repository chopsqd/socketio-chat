const users = []

// Join user to the chat
const userJoin = (id, username, room) => {
    const user = {id, username, room}

    users.push(user)

    return user
}

//Get current user
const getCurrentUser = id => {
    return users.find(user => users.id === id)
}

module.exports = {
    userJoin,
    getCurrentUser
}