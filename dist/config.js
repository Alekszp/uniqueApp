"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expiresIn = exports.jwt = void 0;

function ExtractJwt(req) {
  var token = null;

  if (req.cookies && req.cookies.token != void 0) {
    token = req.cookies['token'];
  }

  return token;
}

var jwt = {
  jwtFromRequest: ExtractJwt,
  secretOrKey: 'Gkaj2gvJK86RY5fygkCxEp8gp44tTg7Kg5QK3M44G39wnWrR2D'
};
exports.jwt = jwt;
var expiresIn = '1 day';
exports.expiresIn = expiresIn;