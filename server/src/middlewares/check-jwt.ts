import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express-serve-static-core';
const config = require('../config/development');

export const jwtCheck = (req: Request, res: Response, next: NextFunction) => {
    let token = req.header["authorization"];

    if (token) {
        jwt.verify(token, config.secret,  (err, decoded) => {
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

