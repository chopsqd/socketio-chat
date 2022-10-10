const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Run when client connects
io.on('connection', socket => {
    // Welcome current user
    socket.emit('message', 'Welcome to the chat!')

    //Broadcast when a user connects
    socket.broadcast.emit('message', 'A user joined the chat')

    //Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'User has left the chat')
    })

    //Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg)
    })
})

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
