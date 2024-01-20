const express =require('express')
const app=express()
const http=require('http')
const {Server}=require('socket.io')
const cors=require('cors')
require('dotenv').config();

const server=http.createServer(app)
const hosts={}
const ids={}

const io=new Server(server,{
    cors:{
        origin:'https://rock-paper-scissors-cdgame.netlify.app',
        methods:["GET","POST"],
    }
})

io.on("connection",(socket)=>{
    console.log(`User Connected : ${socket.id}`)
    
    socket.on("join_room",(data)=>{
        const {room,socketId}=data;
        if (!ids[room]) {
            ids[room] = [];
        }
        ids[room].push(socketId)
        if(ids[room]&&ids[room].length>=3)
        {
            
            const userId=ids[room][ids[room].length - 1];
            
            ids[room] = ids[room].filter(id => id !== userId);


            
                socket.emit("already_ocuup","already occupied so please choose different room")
                
            

            return;
        }
        
        socket.join(room)

        const isHost = !hosts[room];
        if (isHost) {
            hosts[room] = socket.id;
            io.to(socket.id).emit('youAreHost'); 
        } else {
            // Emit 'userConnected' user ko btane ke liye
            io.to(socket.id).emit('userConnected', 'You have joined the room!');
            // Emit 'userConnected' host ko btane ke liye
            io.to(hosts[room]).emit('userConnected', 'A new user has connected to your room!');
        }

    })


    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
        
    })
   
    socket.on("disconnect", () => {
        
        const room = findRoomBySocketId(socket.id);
        if (room && hosts[room] === socket.id) {
            delete ids[room];
            delete hosts[room];
        }
    });
    

})

function findRoomBySocketId(socketId) {
    
    for (const room in hosts) {
        if (hosts[room] === socketId) {
            return room;
        }
    }
    return null;
}

server.listen(process.env.PORT||3001,()=>{console.log("server is running")})

