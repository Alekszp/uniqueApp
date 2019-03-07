"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _path = _interopRequireDefault(require("path"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _socket2 = _interopRequireDefault(require("./socket.js"));

var _router = _interopRequireDefault(require("./router.js"));

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _config = require("./config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport.default.use(new _passportJwt.Strategy(_config.jwt, function (jwt_payload, done) {
  if (jwt_payload != void 0) {
    return done(false, jwt_payload);
  }

  ;
  done();
}));

_mongoose.default.set('debug', true);

_mongoose.default.connect('mongodb://localhost:27017/workers', {
  useNewUrlParser: true
});

_mongoose.default.Promise = Promise;

_mongoose.default.set("debug", true);

var app = (0, _express.default)();

var server = _http.default.Server(app);

var io = (0, _socket.default)(server, {
  serveClient: true
});
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use((0, _cookieParser.default)());
(0, _router.default)(app);
(0, _socket2.default)(io);
server.listen(7001, function () {
  console.log('Server is up to running on 7001 port');
});