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
            console.log(jwtError);
            res.clearCookie('token');
            res.clearCookie('user');
            res.status(401).send('have not access');
            return;
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

    app.get('/getuser', checkAuth, async (req, res) => {
        let info = jwt.decode(req.cookies.token);
        let fullUserInfo = await UserModel.findOne({ userEmail: { $regex: _.escapeRegExp(info.userEmail), $options: 'i' } }).lean().exec();
        let user = {
            firstName: fullUserInfo.firstName,
            lastName: fullUserInfo.lastName,
            userEmail: fullUserInfo.userEmail
        }
        if (user !== null) {
            res.status(200).send(user)
        } else res.status(401).send('have not access')
    });
    
    app.get('/isAuthorized', (req, res) => {
        let token = jwt.decode(req.cookies.token);
        console.log('token', token);
        if (token !== null) {
            res.status(200).send(token);
        } else {
            res.status(401).send('401 Unauthorized');
        }
    });

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
    });

    app.post('/registrationNewUser', async (req, res) => {
        try {
            let user = await UserModel.findOne({ userEmail: { $regex: _.escapeRegExp(req.body.userEmail), $options: 'i' } }).lean().exec();

            if (user != void (0)) {
                return res.status(500).send({ message: "User already exist. Register another email." });
            }
            user = await UserModel.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                userEmail: req.body.userEmail
            });
            const token = createToken({
                id: user._id,
                userEmail: user.userEmail,
            });
            let userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userEmail: req.body.userEmail
            };
            res.cookie('token', token, { httpOnly: true });
            res.cookie('user', JSON.stringify(userData));
            res.status(200).send('registrate');

        } catch (error) {
            console.log(error);
        }
    });
    app.post('/login', async (req, res) => {
        try {
            let user = await UserModel.findOne({ userEmail: { $regex: _.escapeRegExp(req.body.login), $options: 'i' } }).lean().exec();

            if (user != void (0) && bcrypt.compareSync(req.body.password, user.password)) {
                const token = createToken({
                    id: user._id,
                    userEmail: user.userEmail
                });
                let userData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userEmail: user.userEmail,
                }
                res.cookie('token', token, { httpOnly: true });
                res.cookie('user', JSON.stringify(userData));


                // set cookie for timestamp
                // let tokenD = jwt.decode(token);
                // console.log('token.exp', tokenD.exp);
                // let preStr = '';
                // let postStr = '';
                // for (let i = 0; i < 10; i++) {
                //     let rnum1 = Math.floor(Math.random()*10);
                //     let rnum2 = Math.floor(Math.random()*10);
                //     preStr = preStr + rnum1;
                //     postStr = postStr + rnum2;
                // };
                // let tokenStr = preStr + tokenD.exp + postStr;
                // res.cookie('idt', tokenStr);
                res.status(200).send(userData);
                
                console.log('login');

            } else {
                res.status(400).send({ message: "User not exist or password not a correct" });
            }

        } catch (error) {
            res.status(500).send({ message: "Error ! Can not login" });
        }
    });
    app.post('/logout', (req, res) => {
        res.clearCookie('token');
        res.clearCookie('user');
        res.status(200).send('exiteeeee');
        // res.redirect('/UnauthorizedPage');
        console.log('logout');
    })
}