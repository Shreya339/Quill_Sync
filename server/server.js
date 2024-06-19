const io = require('socket.io')(3001, {
    // cors -> cross origin request support
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on("connection", socket => {
    socket.on("send-changes", delta => {
        socket.broadcast.emit("receive-changes", delta)
    })
})

/* 

.on is a method commonly used in event-driven programming, particularly with libraries and frameworks that handle events, such as Socket.IO

Socket.IO connection Event:
The io.on("connection", socket => { ... }) sets up an event listener that triggers when a new client connects to the server. The socket object represents the connection to that particular client.

send-changes Event:
Inside the connection event, the server listens for a custom event named send-changes emitted by the connected client. The delta parameter contains the changes made in the Quill editor.

Broadcasting receive-changes Event:
When the server receives the send-changes event, it uses socket.broadcast.emit("receive-changes", delta) to broadcast the delta (the changes) to all other connected clients except the one that sent the changes. This ensures that all other clients receive the updates and can reflect them in their editors. 
*/