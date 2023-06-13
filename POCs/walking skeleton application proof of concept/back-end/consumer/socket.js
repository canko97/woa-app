const { Server } = require('socket.io');
const app = require('express')();
const cors = require('cors');

const io = new Server({
    cors: {
        origin: 'http://localhost:3001',
    },
});

module.exports = {
    socket: (any = io.on('connection', (socket) => {
        console.log(`User Socket Connected: ${socket.id}`);
        socket.on('disconnect', () =>
            console.log(`${socket.id} User disconnected.`)
        );
    })),
};

io.listen(1923);
