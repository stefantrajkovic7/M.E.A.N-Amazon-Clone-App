import * as mongoose from 'mongoose';
const bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;
import {NextFunction} from "express";

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true },
    name: String,
    password: String,
    picture: String,
    isSeller: { type: Boolean, default: false },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    created: { type: Date, default: Date.now }
});

UserSchema.pre('save', (next: NextFunction) => {
    let user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSaltSync(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        })

    })
});