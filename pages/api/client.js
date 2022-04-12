const nodemailer = require("nodemailer");
import emailReciept from '../../utils/emailReciept'
const {setCookie} = require('nookies');

export default async function Client(req, res, next) {
    if(req.method === "POST") {
        const {name, contactMethod, contactDet, service, serviceDet, emailAddress} = req.body;
        if(req.cookies.timeSend){
            return res.send({ success: false, error: "timeout"})
        }

        if(emailAddress.length > 0) {
            let transporter = nodemailer.createTransport({
                host: "smtp-relay.sendinblue.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_MAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            await transporter.sendMail({
                from: '"Lance Francisco "<lancefrancisco@quizpy.live>',
                to: [emailAddress, "lancefrancisco@quizpy.live"],
                subject: "Your work with Lance Francisco ✔",
                text: `Your contact information's are received. Please wait and we will contact you`,
                html: emailReciept(req.body),
            }).then(function(e){
                const date_ob = new Date();
                setCookie({ res }, 'timeSend', `${date_ob.getHours()}|${date_ob.getMinutes()}`, {
                    maxAge: 90,
                    path: '/',
                });
                return res.send({ success: true, error: '', emailSent: contactDet})
            }).catch(function(e){
                return res.send({ success: false, error: e})
            })
        }else{
            return res.send({ success: false, error: 'invalid_email'})
        }
    }else{
        res.send({success: false, error: "request_unavailable"});
    }
}