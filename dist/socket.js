"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MsgModel = _interopRequireDefault(require("./models/MsgModel.js"));

var socket = function socket(io) {
  io.on('connection', function (socket) {
    socket.emit('connected');
    socket.join('all');
    socket.on('msg', function (content) {
      var messageObj = {
        date: new Date(),
        content: content,
        username: socket.id
      };

      _MsgModel.default.create(messageObj, function (error) {
        if (error) {
          socket.emit('error', error);
        } else {
          socket.emit("message", messageObj);
          socket.to('all').emit("message", messageObj);
        }
      });
    });
    socket.on("receiveHistory", function () {
      _MsgModel.default.find({}).sort({
        date: -1
      }).limit(50).lean().exec(function (error, messages) {
        if (!error) {
          socket.emit("history", messages);
        }
      });
    });
  });
};

var _default = socket;
exports.default = _default;