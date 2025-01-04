require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import cors

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3001", // React app origin
    methods: ["GET", "POST"],
  },
});

// Keep track of connected users
const users = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinDocument', (data) => {
    users[socket.id] = data.user; // Save user info with socket ID
    console.log(`${data.user.name} joined the document`);

    // Broadcast the updated user list
    io.emit('updateUsers', Object.values(users));
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    delete users[socket.id]; // Remove user from the list

    // Broadcast the updated user list
    io.emit('updateUsers', Object.values(users));
  });

  // Handle document updates
  socket.on('updateDocument', (data) => {
    console.log('Document update received:', data.content);
    socket.broadcast.emit('documentUpdate', data.content);
  });
});

const PORT = process.env.PORT || 3000; // Use PORT from .env
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
