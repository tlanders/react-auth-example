import {getDbConnection} from "../db";
import jwt from 'jsonwebtoken';
import {ObjectId} from 'mongodb';

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req,res) => {
        const {verificationString} = req.body;
        console.log(`verify email: ${verificationString}`);

        const db = getDbConnection('react-auth-db');
        const result = await db.collection('users').findOne({verificationString});

        console.log(result);
        if(!result) {
            console.log(`verify email - not found`);
            return res.sendStatus(401);
        }

        console.log(`verify email - found, trying to mark as verified`);
        const {_id: id, email, info} = result;

        await db.collection('users').updateOne({
            _id: ObjectId(id) },
            {
                $set: {isVerified: true},
                $unset: {verificationString: ''}
            },
        );

        jwt.sign({id, email, isVerified: true, info},
            process.env.JWT_SECRET,
            {expiresIn: '2d'},
            (err, token) => {
                if(err) {
                    console.log(`verify email - error signing token: ${err}`);
                    return res.sendStatus(500);
                }

                console.log('verify email successful');
                res.status(200).json({token});
            });
    }
};