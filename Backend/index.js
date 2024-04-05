import express from 'express';
import { dbConnection } from './db/dbConnection.js';
import { Server } from "socket.io";
import { messageModel } from './db/model/note.model.js';
const app = express();
const port = 3000;
dbConnection();
app.get('/',  (req, res) => {res.send('Hello World!')});
let server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// Socket IO Initialization
const io = new Server(server, {
    cors: "*"
});
//  Message Handling Functions
io.on( 'connection', ( socket )=>{
    // 
    socket.on('sendMsg',(data)=>{  
        // io mean send for everyone connected  => io.emit('reply', data + ' from server'  ); 
        // to every expect sender
        socket.broadcast.emit('reply', data); 
    });
    
    socket.on('typing',(data)=>{  
        socket.broadcast.emit('userTyping'); 
    });
    
    socket.on('stopTyping',(data)=>{  
        socket.broadcast.emit('userStopTyping'); 
    });
    
    socket.on('add',async(data)=>{
        await messageModel.insertMany(data); 
        })

    socket.on('getAllMessages', async (data) => { 
        const allMessages = await messageModel.find(); 
        socket.emit('allMessages', allMessages);
    })

    console.log("socket connected");

    //  disconnect when client leaves the application
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
});