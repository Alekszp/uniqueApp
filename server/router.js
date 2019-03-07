import UserModel from "./models/UserModel.js";
import path from 'path';
import _ from "lodash";
import bcrypt from "bcryptjs";
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import * as config from "./config.js";
import "babel-polyfill";

function checkAuth(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, decryptToken, jwtError) => {
        if (err != void (0) || jwtError != void (0)) {
            return res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'), { error: err || jwtError });
        }
        req.user = decryptToken;
        next();
    })(req, res, next)
}

function createToken(body) {
    return jwt.sign(body, config.jwt.secretOrKey, { expiresIn: config.expiresIn })
}

export default (app) => {
    app.use('/dist', express.static('./dist'));

    app.get('/*', checkAuth, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'), { userEmail: req.user.userEmail });
    });

    app.post('/RegistrationForm', (req, res) => {
        try {
            // let user = await UserModel.findOne({ userEmail: { $regex: _.escapeRegExp(req.body.userEmail), $options: 'i' } }).lean().exec();
            
           let user = UserModel.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.userEmail,
                userEmail: req.body.userEmail
            }).then((q) => {console.log(q);}).catch((w) => {console.log(w);});
            console.log(user);
            const token = createToken({
                id: user._id,
                userEmail: user.userEmail
            });
            
            res.cookie('token', token, { httpOnly: true });
            res.status(200).send();

        } catch (error) {
            console.log(error);
        }
    })
}