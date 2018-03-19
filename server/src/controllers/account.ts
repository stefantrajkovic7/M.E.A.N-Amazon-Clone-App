import * as express from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';
const jwt = require('jsonwebtoken');
// const req = require("express-validator");

// const User = require("../models/user.model");
import {secret} from "../config/development";
import User from "../models/user.model";

/**
 * POST /signup
 * Create a new local account.
 */
export let postSignup = ( req: Request, res: express.Response, next: express.NextFunction) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        // picture: this.user.gravatar(),
        isSeller: req.body.isSeller
    });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) return next(err);
        if (existingUser) {
            res.json({
                success: false,
                message: 'Account with that email is already exist!'
            })
        } else {
            user.save();
            let token = jwt.sign({
                user: user
            }, secret, {
                expiresIn: '1d'
            });
            console.log(user);
            res.status(200).json({success: true, token: token});
        }
    });
};

export let postLogin = (req: Request, res: express.Response) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        console.log(user);
        if (!user) {
            res.json({
                success: false,
                message: 'User Failed!'
            })
        } else if (user) {
            let validPassword = user.comparePassword(req.body.password);
            console.log(validPassword);
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Password Failed!'
                });
            } else {
                let token = jwt.sign({
                    user: user
                }, secret, {
                    expiresIn: '1d'
                });
                console.log(user);
                res.json({
                    success: true,
                    token: token
                })
            }
        }
    })

};