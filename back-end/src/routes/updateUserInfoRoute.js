import {getDbConnection} from "../db";
import jwt from 'jsonwebtoken';
import {ObjectId} from 'mongodb';

export const updateUserInfoRoute = {
    path: '/api/users/:id',
    method: 'put',
    handler: async (req,res) => {
        const { authorization } = req.headers;
        const { id } = req.params;

        console.log(`update user ${id}, auth: ${authorization}`);

        if(!authorization) {
            console.log('update error - no authorization')
            res.sendStatus(401);
        }
        if(!id) {
            console.log('update error - no userId')
            res.sendStatus(403);
        }

        console.log(req.body);

        // only let user modify certain values
        // const updates = (({favoriteFood, hairColor, bio}) => {favoriteFood, hairColor, bio})(req.body);

        const {favoriteFood, hairColor, bio} = req.body;

        // console.log(updates);

        const token = authorization.split(' ')[1];
        console.log(`update user: token=${token}`);

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if(err) {
                console.log(`update user info - error verifying token: ${err}`);
                return res.sendStatus(401);
            }

            console.log('update user - no error after verify');
            // don't let a user modify someone else's data
            const {id, isVerified} = decoded;
            if(id !== id) {
                console.log("update failed - user can't update someone else");
                return res.sendStatus(403);
            }
            if(!isVerified) {
                console.log('update failed - user not verified');
                return res.sendStatus(403);
            }
        })

        const db = getDbConnection('react-auth-db');
        const result = await db.collection('users').findOneAndUpdate(
            {_id:ObjectId(id)},
            {$set: {info: {favoriteFood, hairColor, bio}}},
            {returnOriginal: false},
            );

        const {email, isVerified, info} = result.value;

        jwt.sign({id, email, isVerified, info}, process.env.JWT_SECRET,
            {expiresIn: '2d'},
            (err,token) => {
                if(err) {
                    console.log(`update user - error signing token: ${err}`);
                    return res.sendStatus(500);
                }

                res.status(200).json({token});
            });

        console.log('update user successful');
    }
}