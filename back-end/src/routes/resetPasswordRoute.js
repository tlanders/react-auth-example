import {getDbConnection} from '../db';
import bcrypt from 'bcrypt';

export const resetPasswordRoute = {
    path: '/api/users/:passwordResetCode/reset-password',
    method: 'put',
    handler: async (req, res) => {
        const {passwordResetCode} = req.params;
        const {newPassword} = req.body;
        const passwordHash = bcrypt.hash(newPassword, 10);

        console.log('reset password post - resetCode=' + passwordResetCode);

        const db = getDbConnection('react-auth-db');

        try {
            await db.collection('users')
                .updateOne(
                    {passwordResetCode},
                    {
                        $set: {passwordHash},
                        $unset: {passwordResetCode: ''},
                    }
                );
            console.log('reset password success');
        } catch(err) {
            console.log('reset password failed');
            console.log(err);
        }

        res.sendStatus(200);
    },
};