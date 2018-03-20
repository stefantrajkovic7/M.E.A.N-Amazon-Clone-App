import * as mongoose from 'mongoose';
// const bcrypt = require('bcrypt');
import * as bcrypt from 'bcrypt';
import {NextFunction} from "express";
const crypto = require('crypto');

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

UserSchema.pre("save", function(next: NextFunction) {
    let user = this;

    if (!user.isModified('password')) return next();
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err)  return callback(err);
        callback(null, isMatch);
    });
};

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

// UserSchema.methods.gravatar = function(size) {
//     if (!this.size) size = 200;
//
//     if (!this.email) {
//         return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
//     } else {
//         let md5 = crypto.createHash('md5').update(this.email).digest('hex');
//         return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro';
//     }
//
// };

const User = mongoose.model("User", UserSchema);
export default User;

