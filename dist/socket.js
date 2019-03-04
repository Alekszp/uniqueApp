"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MsgModel = _interopRequireDefault(require("./models/MsgModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = function socket(io) {
  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });
    socket.join('all');
    socket.on('message', function (content) {
      var messageObj = {
        date: new Date(),
        content: content,
        username: socket.id
      };

      _MsgModel.default.create(messageObj, function (error) {
        if (error) return console.log(error);
        socket.emit("msg", messageObj);
        socket.to('all').emit("msg", messageObj);
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