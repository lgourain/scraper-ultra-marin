const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://www.klikego.com/revente-dossard/lultra-marin-2023/1605741692033-3';
const nodemailer = require('nodemailer');

function sendEmail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'GMAIL_USER',
            pass: 'GMAIL_PASSWORD',
        },
    });
    
    const mailOptions = {
        from: 'MAIL_FROM',
        to: 'MAIL_TO',
        subject: '[ALERT] Ultra Marin 2023 - Dossard disponible !',
        text: 'https://www.klikego.com/revente-dossard/lultra-marin-2023/1605741692033-3',
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('[ERROR] Email:', error);
        } else {
            console.log('[SUCCESS] Email sent:', info.response);
        }
    });
}

rp(url)
    .then(function(html){
        //success!
        const $ = cheerio.load(html);
        const hasAlertMessage = $('.alert-info').html() !== null;

        if (!hasAlertMessage) {
            console.log('Alert message is gone ! :)');
            sendEmail();
        } else {
            console.log('Alert message is still here ! :(');
        }
    })
    .catch(function(error) {
        //handle error
        console.log('[ERROR] Scraping', error)
    }); 