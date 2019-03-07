"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserModel = _interopRequireDefault(require("./models/UserModel.js"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var config = _interopRequireWildcard(require("./config.js"));

require("babel-polyfill");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkAuth(req, res, next) {
  _passport.default.authenticate('jwt', {
    session: false
  }, function (err, decryptToken, jwtError) {
    if (err != void 0 || jwtError != void 0) {
      return res.sendFile(_path.default.join(__dirname, '..', 'dist', 'index.html'), {
        error: err || jwtError
      });
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
  app.get('/*', checkAuth, function (req, res) {
    res.sendFile(_path.default.join(__dirname, '..', 'dist', 'index.html'), {
      userEmail: req.user.userEmail
    });
  });
  app.post('/RegistrationForm', function (req, res) {
    try {
      // let user = await UserModel.findOne({ userEmail: { $regex: _.escapeRegExp(req.body.userEmail), $options: 'i' } }).lean().exec();
      var user = _UserModel.default.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.userEmail,
        userEmail: req.body.userEmail
      }).then(function (q) {
        console.log(q);
      }).catch(function (w) {
        console.log(w);
      });

      console.log(user);
      var token = createToken({
        id: user._id,
        userEmail: user.userEmail
      });
      res.cookie('token', token, {
        httpOnly: true
      });
      res.status(200).send();
    } catch (error) {
      console.log(error);
    }
  });
};

exports.default = _default;