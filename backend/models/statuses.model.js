const mongoose = require('mongoose');

const statusesSchema = new mongoose.Schema({
    name    : { type : String, required : true },
    status  : { type : Boolean, required : true },
    date    : { type : Date, default : Date.now() },
    user_id : { type : mongoose.Types.ObjectId, ref : "users" },
});

const status = mongoose.model("statuses",  statusesSchema);

module.exports = status;
