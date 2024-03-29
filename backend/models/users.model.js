const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');
const moment   = require('moment');

const usersSchema = new mongoose.Schema({
    name     : { type : String, required : true },
    email    : { type : String, required : true },
    password : { type : String, required : true },
    date     : { type : Date, default : Date.now() },
    status   : { type : Boolean, required : true },
});

usersSchema.methods.generateJWT = function() {
    return jwt.sign(
        {
            _id     : this._id,
            name    : this.name,
            iat     : moment().unix(),
        },
        process.env.SECRET_KEY_JWT
    );
}

const user = mongoose.model("users",  usersSchema);

module.exports = user;
