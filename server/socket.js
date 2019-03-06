import MessageModel from "./models/MsgModel.js";

const socket = (io) => {
    io.on('connection', (socket) => {
        socket.emit('connected');
        socket.join('all');
        socket.on('msg', (content) => {
            const messageObj = {
                date: new Date(),
                content: content,
                username: socket.id
            };
            MessageModel.create(messageObj, (error) => {
                if(error) {
                    socket.emit('error', error)
                } else {
                    socket.emit("message", messageObj);
                    socket.to('all').emit("message", messageObj);
                }
                
            });
        });
        socket.on("receiveHistory", ()=>{
            MessageModel
            .find({})
            .sort({date: -1})
            .limit(50)
            .lean()
            .exec((error, messages)=>{
                if(!error){
                    socket.emit("history", messages);
                }
            });
        });
    });
};

export default socket;