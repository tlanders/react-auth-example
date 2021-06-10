import {getDbConnection} from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const {email, password} = req.body;

        console.log('login post - email=' + email);

        const db = getDbConnection('react-auth-db');

        const user = await db.collection('users').findOne({email});
        if(!user) {
            // XXX - user not found
            console.log('login - user not found');
            return res.sendStatus(401);
        }

        const {_id: id, isVerified, passwordHash, info} = user;

        const isCorrect = await bcrypt.compare(password, passwordHash);

        if(isCorrect) {
            jwt.sign({
                    id,
                    isVerified,
                    email,
                    info
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '2d',
                },
                (err, token) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        res.status(200).send({token})
                    }
                }
            );
        } else {
            console.log('login - password mismatch');
            res.sendStatus(401);
        }
    },
};