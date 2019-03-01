import MessageModel from "./models/MsgModel.js";

const socket = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.join('all');
        socket.on('message', (content) => {
            const messageObj = {
                date: new Date(),
                content: content,
                username: socket.id
            };
            MessageModel.create(messageObj, (error) => {
                if(error) return console.log(error);
                socket.emit("msg", messageObj);
                socket.to('all').emit("msg", messageObj);
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