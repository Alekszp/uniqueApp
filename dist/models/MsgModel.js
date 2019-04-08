"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose.default.Schema;
var MessageSchema = new Schema({
  date: {
    type: Date
  },
  content: {
    type: String
  }
}, {
  versionKey: false,
  collection: "MessageCollection"
});

var _default = _mongoose.default.model("MessageSchema", MessageSchema);

exports.default = _default;