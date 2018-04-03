import { Request, Response, NextFunction } from 'express-serve-static-core';
import User from "../../../models/user.model";
import {secret} from "../../../config/development";
const jwt = require('jsonwebtoken');

exports.signup = ( req: Request, res: Response, next: NextFunction) => {

    let user: any = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;

    User.findOne({ email: req.body.email }, (err, existingUser) => {
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

            return user.save((err, item) => {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json({item, success: true, token: token});
            });
        }
    });
};

exports.login = (req: Request, res: Response) => {
    let model = User;
    console.log(model);
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

exports.show = ( req: Request, res: Response) => {
    User.findOne({ _id: (<any>req).decoded.user._id }, (err, user) => {
        res.json({
            success: true,
            user: user,
            message: 'Successful'
        });
    });
};

exports.create = ( req: Request, res: Response) => {
    User.findOne({ _id: (<any>req).decoded.user._id }, (err, user) => {
        res.json({
            success: true,
            user: user,
            message: 'Successful'
        });
    });
};