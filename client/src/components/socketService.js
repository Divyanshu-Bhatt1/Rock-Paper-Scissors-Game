import { io } from 'socket.io-client';

// const socket = io('http://localhost:3001');
const socket = io('https://rock-paper-scissors-game-server.onrender.com');

export default socket;
