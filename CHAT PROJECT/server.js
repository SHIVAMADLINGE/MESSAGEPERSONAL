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

// This tells the app: Use the environment port OR 3000 if none exists
const PORT = process.env.PORT || 3000;

http.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
