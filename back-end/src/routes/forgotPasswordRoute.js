import {getDbConnection} from '../db';
import {v4 as uuid} from 'uuid';
import {sendEmail} from '../util/sendEmail';

export const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        const {email} = req.params;

        console.log('forgot password post - email=' + email);

        const db = getDbConnection('react-auth-db');

        const passwordResetCode = uuid();

        const {result} = await db.collection('users').updateOne({email},{$set: {passwordResetCode}});

        if(result.nModified > 0) {
            // can send email
            try {
                sendEmail({
                    to: email,
                    from: 'lists@landersconsulting.biz',
                    subject: 'Reset Your Password',
                    text: `We received a request to reset your password. Please click this link to reset it:
                http://localhost:3000/reset-password/${passwordResetCode}`
                });
            } catch(e) {
                console.log("failed to send password reset email");
                console.log(e);
                return res.sendStatus(500);
            }
        }

        console.log("forgot password successful");
        res.sendStatus(200);
    },
};