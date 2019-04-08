"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var Schema = _mongoose.default.Schema;
var UserProfileSchema = new Schema({
  addedAt: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    minlength: 1
  },
  lastName: {
    type: String,
    minlength: 1
  },
  userEmail: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  collection: 'UsersCollection'
});
UserProfileSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew()) {
    this.password = _bcryptjs.default.hashSync(this.password, 12);
  }

  next();
});

var _default = _mongoose.default.model("UsersModel", UserProfileSchema);

exports.default = _default;