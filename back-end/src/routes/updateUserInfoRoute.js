import {getDbConnection} from "../db";
import jwt from 'jsonwebtoken';
import {ObjectId} from 'mongodb';

export const updateUserInfoRoute = {
    path: '/api/users/:id',
    method: 'put',
    handler: async (req,res) => {
        const { authorization } = req.headers;
        const { id: requestId } = req.params;

        console.log(`update user ${requestId}, auth: ${authorization}`);

        if(!authorization) {
            console.log('update error - no authorization')
            res.sendStatus(401);
        }
        if(!requestId) {
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

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('update user, decoded...');
            console.log(decoded);
            const {id} = decoded;
            console.log('update user, tokenId: ' + id);
            if(requestId !== id) {
                console.log("update failed - user can't update someone else");
                return res.sendStatus(403);
            }
        } catch(err) {
            console.log('Exception verifying token');
            console.log(err);
            return res.sendStatus(401);
        }

        console.log('update user - no error after verify');

        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({_id:ObjectId(requestId)});
        if(!user) {
            // XXX - user not found
            console.log('login - user not found');
            return res.sendStatus(401);
        }

        const {isVerified} = user;

        if(!isVerified) {
            console.log('update failed - user not verified');
            return res.sendStatus(403);
        }

        const result = await db.collection('users').findOneAndUpdate(
            {_id:ObjectId(requestId)},
            {$set: {info: {favoriteFood, hairColor, bio}}},
            {returnOriginal: false},
            );

        const {email, info} = result.value;

        jwt.sign({id: requestId, email, isVerified : true, info}, process.env.JWT_SECRET,
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