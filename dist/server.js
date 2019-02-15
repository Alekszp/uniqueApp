"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use('/dist', _express.default.static('./dist'));
app.get('/*', function (req, res) {
  res.sendFile(_path.default.join(__dirname, '..', 'dist', 'index.html'));
}); // app.get('/about', (req, res)=> {
//     res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
// });

app.listen(7001, '0.0.0.0', function () {
  console.log('Server is up to running on 7001 port');
});