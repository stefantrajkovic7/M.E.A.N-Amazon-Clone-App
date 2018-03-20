import * as express from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';
const jwt = require('jsonwebtoken');
import {secret} from "../config/development";
import User from "../models/user.model";

export let postSignup = function( req: Request, res: express.Response, next: express.NextFunction) {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        // picture: this.user.gravatar(),
        isSeller: req.body.isSeller
    });

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

            const obj = new User(req.body);
            console.log(obj);
            return obj.save(function(err, item) {
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
            res.status(200).json({ token: token });
        });

    })

};