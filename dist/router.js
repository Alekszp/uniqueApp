"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _UserModel = _interopRequireDefault(require("./models/UserModel.js"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var config = _interopRequireWildcard(require("./config.js"));

require("babel-polyfill");

function checkAuth(req, res, next) {
  _passport.default.authenticate('jwt', {
    session: false
  }, function (err, decryptToken, jwtError) {
    if (err != void 0 || jwtError != void 0) {
      console.log(jwtError);
      res.clearCookie('token');
      res.clearCookie('user');
      res.status(401).send('have not access');
      return;
    }

    req.user = decryptToken;
    next();
  })(req, res, next);
}

function createToken(body) {
  return _jsonwebtoken.default.sign(body, config.jwt.secretOrKey, {
    expiresIn: config.expiresIn
  });
}

var _default = function _default(app) {
  app.use('/dist', _express.default.static('./dist'));
  app.get('/getuser', checkAuth,
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res) {
      var info, fullUserInfo, user;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              info = _jsonwebtoken.default.decode(req.cookies.token);
              _context.next = 3;
              return _UserModel.default.findOne({
                userEmail: {
                  $regex: _lodash.default.escapeRegExp(info.userEmail),
                  $options: 'i'
                }
              }).lean().exec();

            case 3:
              fullUserInfo = _context.sent;
              user = {
                firstName: fullUserInfo.firstName,
                lastName: fullUserInfo.lastName,
                userEmail: fullUserInfo.userEmail
              };

              if (user !== null) {
                res.status(200).send(user);
              } else res.status(401).send('have not access');

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  app.get('/isAuthorized', function (req, res) {
    var token = _jsonwebtoken.default.decode(req.cookies.token);

    console.log('token', token);

    if (token !== null) {
      res.status(200).send(token);
    } else {
      res.status(401).send('401 Unauthorized');
    }
  });
  app.get('/*', function (req, res) {
    res.sendFile(_path.default.join(__dirname, '..', 'dist', 'index.html'));
  });
  app.post('/registrationNewUser',
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(req, res) {
      var user, token, userData;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _UserModel.default.findOne({
                userEmail: {
                  $regex: _lodash.default.escapeRegExp(req.body.userEmail),
                  $options: 'i'
                }
              }).lean().exec();

            case 3:
              user = _context2.sent;

              if (!(user != void 0)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(500).send({
                message: "User already exist. Register another email."
              }));

            case 6:
              _context2.next = 8;
              return _UserModel.default.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                userEmail: req.body.userEmail
              });

            case 8:
              user = _context2.sent;
              token = createToken({
                id: user._id,
                userEmail: user.userEmail
              });
              userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userEmail: req.body.userEmail
              };
              res.cookie('token', token, {
                httpOnly: true
              });
              res.cookie('user', JSON.stringify(userData));
              res.status(200).send('registrate');
              _context2.next = 19;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 16]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  app.post('/login',
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(req, res) {
      var user, token, userData;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _UserModel.default.findOne({
                userEmail: {
                  $regex: _lodash.default.escapeRegExp(req.body.login),
                  $options: 'i'
                }
              }).lean().exec();

            case 3:
              user = _context3.sent;

              if (user != void 0 && _bcryptjs.default.compareSync(req.body.password, user.password)) {
                token = createToken({
                  id: user._id,
                  userEmail: user.userEmail
                });
                userData = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  userEmail: user.userEmail
                };
                res.cookie('token', token, {
                  httpOnly: true
                });
                res.cookie('user', JSON.stringify(userData)); // set cookie for timestamp
                // let tokenD = jwt.decode(token);
                // console.log('token.exp', tokenD.exp);
                // let preStr = '';
                // let postStr = '';
                // for (let i = 0; i < 10; i++) {
                //     let rnum1 = Math.floor(Math.random()*10);
                //     let rnum2 = Math.floor(Math.random()*10);
                //     preStr = preStr + rnum1;
                //     postStr = postStr + rnum2;
                // };
                // let tokenStr = preStr + tokenD.exp + postStr;
                // res.cookie('idt', tokenStr);

                res.status(200).send(userData);
                console.log('login');
              } else {
                res.status(400).send({
                  message: "User not exist or password not a correct"
                });
              }

              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              res.status(500).send({
                message: "Error ! Can not login"
              });

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  app.post('/logout', function (req, res) {
    res.clearCookie('token');
    res.clearCookie('user');
    res.status(200).send('exiteeeee'); // res.redirect('/UnauthorizedPage');

    console.log('logout');
  });
};

exports.default = _default;