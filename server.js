var express = require('express');
var router = express.Router();
var app = express();
// var favicon         = require('serve-favicon');
var bodyParser = require('body-parser');
var BookingController = require('./routes/booking');

/**
 * Routing & middlewares
 */
app.use(express.static(__dirname + '/static'));
// app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(router);

router.post('/booking', BookingController.post);

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

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
	console.log('Car services runs on port: ' + app.get('port'));
});

module.exports = app;
