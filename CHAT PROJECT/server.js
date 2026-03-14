const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected! ✅');
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Sends the message to EVERYONE
  });
});

http.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000 and accessible on the network');
});