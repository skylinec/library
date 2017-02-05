// server.js
var fs = require('fs');
const express = require('express');
var proxy = require('express-http-proxy');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

var appServer = 'http://localhost:8080';
var authServer = 'http://localhost:3000';

const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {

});


// app.get("/forgot", function(req, res) {
//   console.log('[GET] Forgot password');
//   apiProxy.web(req, res, {target: authServer});
// });
//
// app.get("/login", function(req, res) {
//   console.log('[GET] Login');
//   apiProxy.web(req, res, {target: authServer});
// });
//
// app.get("/logout", function(req, res) {
//   console.log('[GET] Log out');
//   apiProxy.web(req, res, {target: authServer});
// });
//
// app.get("/me", function(req, res) {
//   console.log('[GET] Get user details');
//   apiProxy.web(req, res, {target: authServer});
// });
//
// app.get("/register", function(req, res) {
//   console.log('[GET] Register');
//   apiProxy.web(req, res, {target: authServer});
// });

// app.use('/forgot', proxy('http://localhost:3000'));
// app.use('/login', proxy('http://localhost:3000'));
// app.use('/logout', proxy('http://localhost:3000'));
// app.use('/me', proxy('http://localhost:3000'));
// app.use('/register', proxy('http://localhost:3000'));

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
