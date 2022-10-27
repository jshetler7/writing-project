import * as Mailgun from 'mailgun.js';
import * as FormData from 'form-data';
import * as jwt from 'jsonwebtoken';
import MailGun from 'mailgun.js';
import { jwt_config, mailgun_config } from '../config';

const mailgun = new (<typeof MailGun>(<any>Mailgun))(<any>FormData).client({
    username: 'api',
    //@ts-ignore
    key: mailgun_config.apiKey
});



export const sendVerificationEmail = (email: string) => {

    return new Promise(async (resolve, reject) => {
        try {
            const token = jwt.sign({ email: email }, jwt_config.secret, { expiresIn: '15m' });
            console.log(token);
            //@ts-ignore
            const result = await mailgun.messages.create(mailgun_config.domain, {
                to: email,
                subject: "Verify Your Account",
                from: "<notifications>DoNotReply@calessia.herokuapp.com",
                text: `${mailgun_config.domain}/verify?user=${email}&token=${token}`
            });
            console.log(result);
            resolve('Done');
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}


