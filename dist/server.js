"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = _interopRequireDefault(require("path"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _socket2 = _interopRequireDefault(require("./socket.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import bodyParcer from "body-parser";
// import cookieParser from "cookie-parser";
_mongoose.default.set("debug", true);

_mongoose.default.connect("mongodb://localhost:27017/workers", {
  useNewUrlParser: true
});

_mongoose.default.Promise = Promise;
var app = (0, _express.default)();

var server = _http.default.Server(app);

var io = (0, _socket.default)(server, {
  serveClient: true
});
app.use('/dist', _express.default.static('./dist'));
app.get('/*', function (req, res) {
  res.sendFile(_path.default.join(__dirname, '..', 'dist', 'index.html'));
});
(0, _socket2.default)(io);
server.listen(7001, function () {
  console.log('Server is up to running on 7001 port');
});