import * as express from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';
const jwt = require('jsonwebtoken');
import {secret} from "../config/development";
import  User from "../models/user.model";

export let postSignup = function( req: Request, res: express.Response, next: express.NextFunction) {

    let user: any = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;

    User.findOne({ email: req.body.email }, function(err, existingUser) {
        if (err) return next(err);
        if (existingUser) {
            res.json({
                success: false,
                message: 'Account with that email is already exist!'
            })
        } else {
            let token = jwt.sign({
                user: user
            }, secret, {
                expiresIn: '1d'
            });

            return user.save(function(err, item) {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json({item, success: true, token: token});
            });
        }
    });
};

export let postLogin = (req: express.Request, res: express.Response) => {
    let model = User;

    model.findOne({ email: req.body.email }, (err, user: any) => {
        if (err) throw err;
        console.log(user);
        if (!user) {
            return res.sendStatus(403);
        }
        user.comparePassword(req.body.password, function(error, isMatch) {
            console.log(isMatch);
            if (!isMatch) return res.sendStatus(403);
            const token = jwt.sign({ user: user }, secret, {expiresIn: '1d'});
            return res.status(200).json({ success: true, token: token });
        });

    })

};