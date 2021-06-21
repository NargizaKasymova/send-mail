const express = require('express')
const app = express()
const PORT = 5050


app.use(express.json())

const mailer = require('nodemailer')

const MY_EMAIL = 'input your address'
const MY_PASSWORD = 'input your password'



const transport = mailer.createTransport({
	service: 'Gmail',
	auth: {
		user: MY_EMAIL,
		pass: MY_PASSWORD,
	},
});

let sendMail = (email, subject, text) => {
	transport
		.sendMail({
			to: email,
			text: text,
			from: MY_EMAIL,
			subject: subject
		})
		.then((results) => {
			console.log('Письмо успешно отправлено', results);
            
		})
		.catch((reason) => {
			console.log('Письмо не отправлено по причине: ', reason);
		});
}

function startDelivery(req, res) {
    let user = req.body
    sendMail(user.email, user.subject, user.text)
	return res.status(200).json('письмо отправлено')
}
app.post('/send-mail', startDelivery)

app.listen(PORT, function() {
    console.log('App has been started ' + PORT)
})