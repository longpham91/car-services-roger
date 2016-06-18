var express      = require('express');
var router = express.Router();
var app          = express();
//var favicon      = require('serve-favicon');
var bodyParser   = require('body-parser');

/**
 * Routing & middlewares
 */
app.use(express.static(__dirname + '/static'));
//app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.json({ extended: true }));

// app.use(router);

// router.post('/booking', MessageController.post);

app.use(function (request, response) {
    response.status(404).json({
        message: 'Oops! You may get lost!',
        code: 'E_NOTFOUND'
    });
});

app.use(function (error, request, response, next) {
    response.status(500).json({
        message: error.message,
        code: error.code
    });
});
module.exports = app;