var nodemailer = require('nodemailer');

exports.post = function (request, response) {
	try {
		if (!request.body.email) {
			return response.status(500).json({ success: false, data: 'No email provided!'});
		}

		var smtpTransport = nodemailer.createTransport('smtps://uscar123%40gmail.com:chuanchuan@smtp.gmail.com');
		var name = request.body.first - name + request.body.last - name;
		var email = request.body.email;
		var phone = request.body.phone;
		var message = request.body.message;
		// var tripType = request.body.trip - type;

		var mailOptions = {
			from: email, // sender address
			to: 'uscar123@gmail.com', // reciever
			subject: 'Website Contact Form: ' + name, // Subject line
			html: 'You have received a new message from your website contact form.<br /><br />Here are the details:<br /><br /><strong>Name</strong>: ' + name + '<br /><br /><strong>Email</strong>: ' + email + '<br /><br /><strong>Message</strong>:<br />' + message
		};
		console.log('Sending mail');
		smtpTransport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
				return response.status(500).json({ success: false, data: error});
			}
			response.json({result: 'Message sent: ' + info.response});
		});
	} catch(e) {
		return response.status(500).json({ success: false, data: error});
	}
};
