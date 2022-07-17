const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});

const sendMail = (to, subject, text) => {

    const data = {
        from: process.env.MAILGUN_EMAIL,
        to,
        subject,
        text
    };

    console.log(mg);
    mg.messages().send(data, (err, body) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(body);
        }
    });
}
    
module.exports =  sendMail