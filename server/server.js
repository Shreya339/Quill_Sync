const io = require('socket.io')(3001, {
    // cors -> cross origin request support
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})


io.on("connection", socket => { // when a new client connects

    socket.on("get-document", documentId => {
        const data = ""
        socket.join(documentId)    // group sockets (clients) together
        socket.emit('load-document', data)

        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })
    })
})

/* 

.on is a method commonly used in event-driven programming, particularly with libraries and frameworks that handle events, such as Socket.IO

io.on("connection", socket => { ... }) :
This sets up a listener for when a new client connects (socket represents the client).
When a client connects, the server executes the code inside the callback function.

socket.on("get-document", documentId => { ... }) :
Listens for the "get-document" event from the client.
When the server receives this event, it executes the callback function, passing documentId as a parameter.

const data = "" :
This line initializes an empty string data. You might replace this with actual document data fetched from a database or another data source.

socket.join(documentId) :
The socket.join() method allows the socket to join a room identified by documentId. This is useful for grouping sockets that are interested in the same document.

socket.emit('load-document', data) :
Sends a message ('load-document') back to the client that initiated the "get-document" request, with data as the payload. This payload (data) could contain initial content for the document.

socket.on("send-changes", delta => { ... }) :
Listens for "send-changes" events from the client.
When a client sends a change (delta) to the server, it broadcasts this change to all sockets in the same room (documentId) using socket.broadcast.emit().

socket.broadcast.to(documentId).emit("receive-changes", delta) :
Emits the "receive-changes" event to all sockets except the socket that sent the "send-changes" event. This allows real-time synchronization of document changes among clients.
*/