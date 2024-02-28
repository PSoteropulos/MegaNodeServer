import jwt from 'jsonwebtoken';
// const User = require('../models/user.model')
import dotenv from 'dotenv';
dotenv.config();

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            console.log('Authentication error!')
            res.status(401).json({ verified: false });
        } else {
            req.Token = payload
            console.log("Authentication successful!")
            next();
        }
    });
}

module.exports.loggedUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.userToken, { complete: true });
    User.findById(decodedJWT.payload._id)
        .then(user => {
            console.log(user)
            res.json("Logged user: ", user)
        })
        .catch(err => res.status(400).json(err));
}