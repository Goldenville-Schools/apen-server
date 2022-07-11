const mailgun = require('mailgun-js')

mailgun({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN
})

const sendMail = (to, subject, text) => {
    const data = {
        from: process.env.MAILGUN_EMAIL,
        to,
        subject,
        text
    }

    mailgun.messages().send(data, (err, body) => console.log(body))
}
    
module.exports = { sendMail }