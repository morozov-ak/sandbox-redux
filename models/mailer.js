const nodemailer = require('nodemailer')
const config = require('config')

let user = config.get('SandboxMail')
let password = config.get('SandboxMailPass')

async function mailer(mailText){
    //let testAccount = await nodemailer.createTestAccount();

    
    let transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true, 
        auth: {
            user: user, 
            pass: password 
        }
    });

    console.log('mailer')
    transporter.sendMail(mailText,(err,info)=>{
        if(err) return console.log(err)
        console.log('Email sended!', info)
    })
}

module.exports=mailer
