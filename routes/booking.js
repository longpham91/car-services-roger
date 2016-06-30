var nodemailer = require('nodemailer');

exports.post = function (request, response) {
	console.log(request.body);
	if ((!request.body.email) || (!request.body.phone)) {
		return response.status(500).json({ success: false, data: 'Please provide your contact info!'});
	} else if ((!request.body.pickupTime) || (!request.body.pickupDate)) {
		return response.status(500).json({ success: false, data: 'Please provide a pickup time and/or date!'});
	} else if (!request.body.pickupLocation) {
		return response.status(500).json({ success: false, data: 'Please provide your pickup location!'});
	}

	var smtpTransport = nodemailer.createTransport('smtps://uscar123%40gmail.com:chuanchuan@smtp.gmail.com');
	var name = request.body.firstName + ' ' + request.body.lastName;
	var email = request.body.email;
	var phone = request.body.phone;
	var tripType = request.body.tripType;
	var pickupDate = request.body.pickupDate;
	var pickupTime = request.body.pickupTime;
	var numPassenger = request.body.numPassenger;
	var pickupLocation = request.body.pickupLocation;
	var destination = request.body.destination;
	var addNote = request.body.additionalNote;

	var emailBody = 'You have received a new message from your website contact form.<br /><br />Here are the details:<br /><br />';
	emailBody += '<strong>Name</strong>: ' + name + '<br /><br />';
	emailBody += '<strong>Email</strong>: ' + email + '<br /><br />';
	emailBody += '<strong>Phone Number</strong>: ' + phone + '<br /><br />';
	emailBody += '<strong>Trip Type</strong>: ' + tripType + '<br /><br />';
	emailBody += '<strong>Pickup Time</strong>: ' + pickupTime + ', ' + pickupDate + '<br /><br />';
	if (numPassenger) {
		emailBody += '<strong>Number of Passengers</strong>: ' + numPassenger + '<br /><br />';
	}
	emailBody += '<strong>Pickup Location</strong>: ' + pickupLocation + '<br /><br />';
	if (destination) {
		emailBody += '<strong>Destination</strong>: ' + destination + '<br /><br />';
	} else {
		emailBody += '<strong>Destination</strong>: Unknown<br /><br />';
	}
	if (addNote) {
		emailBody += '<strong>Additional Note</strong>: ' + addNote + '<br /><br />';
	}

	var mailOptions = {
		from: email, // sender address
		to: 'uscar123@gmail.com', // reciever
		subject: 'Website Contact Form: ' + name, // Subject line
		html: emailBody
	};
	smtpTransport.sendMail(mailOptions, function (error, info) {
		if (error) {
			return response.status(500).json({ success: false, data: error});
		}
		response.json({success: true, message: 'Booking completed!'});
	});
};
