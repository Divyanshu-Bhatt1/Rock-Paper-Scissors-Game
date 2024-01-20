import { io } from 'socket.io-client';

// const socket = io('http://localhost:3001');
const socket = io(process.env.REACT_APP_URL);

export default socket;
