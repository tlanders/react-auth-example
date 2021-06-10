import {getDbConnection} from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const {email, password} = req.body;

        console.log('signup post - email=' + email);

        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({email});

        if(user) {
            // XXX - user already exists. might not be a good idea to return this.
            return res.sendStatus(409);
        }

        const passwordHash = await bcrypt.hash(password, 10);
        console.log('signup post - passwordHash=' + passwordHash);

        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: ''
        };

        const result = await db.collection('users').insertOne({
            email,
            isVerified: false,
            passwordHash,
            info: startingInfo
        });

        const {insertedId} = result;
        console.log('signup post - insertedId=' + insertedId);

        jwt.sign({
            id: insertedId,
            isVerified: false,
            email,
            info: startingInfo
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
    },
};