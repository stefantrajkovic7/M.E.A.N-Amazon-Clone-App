import { Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');

import { default as User } from "../models/user.model";
import {secret} from "../config/development";

/**
 * POST /signup
 * Create a new local account.
 */
export let postSignup = (req: any, res: Response, next: NextFunction) => {
    req.assert("email", "Email is not valid").isEmail();
    req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
    req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if (errors) {
        return res.redirect("/signup");
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        picture: this.user.gravatar(),
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

            res.json({
                success: true,
                token: token
            })
        }
    });
};