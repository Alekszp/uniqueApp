import express from 'express';
import mongoose from "mongoose";
// import bodyParcer from "body-parser";
// import cookieParser from "cookie-parser";
import path from 'path';
import http from "http";
import ioClient from "socket.io";
import sockets from "./socket.js";


mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/workers", { useNewUrlParser: true });
mongoose.Promise = Promise;

const app = express();
const server = http.Server(app);
const io = ioClient(server, {serveClient: true});



app.use('/dist', express.static('./dist'));

app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});


sockets(io);

server.listen(7001, ()=> {
    console.log('Server is up to running on 7001 port');
});