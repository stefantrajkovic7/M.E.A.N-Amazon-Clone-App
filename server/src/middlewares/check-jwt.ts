import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import {secret} from "../config/development";

export const jwtCheck = function(req: express.Request, res: Response, next: NextFunction) {
    let token = req.header["authorization"];

    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Token Failed!'
                });
            } else {
                (<any>req).decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403).json({
            success: false,
            message: 'No token provided!'
        });
    }
};

