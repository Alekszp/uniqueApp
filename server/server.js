import express from 'express';
import session from "express-session";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import ioClient from "socket.io";
import sockets from "./socket.js";
import router from './router.js';

import passport from "passport";
import {Strategy} from "passport-jwt";
import {jwt} from "./config.js";

passport.use(new Strategy(jwt, function(jwt_payload, done) {
  if(jwt_payload != void(0)){
      return done(false, jwt_payload)
  };
  done();
}));

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/workers', { useNewUrlParser: true });
mongoose.Promise = Promise;

const app = express();
const server = http.Server(app);
const io = ioClient(server, {serveClient: true});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());  

router(app);
sockets(io);

server.listen(7001, ()=> {
    console.log('Server is up to running on 7001 port');
});