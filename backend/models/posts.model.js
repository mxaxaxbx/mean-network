const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    title     : { type : String, required : true },
    text      : { type : String, required : true },
    date      : { type : Date, default : Date.now() },
    status_id : { type : mongoose.Types.ObjectId, ref : "statuses" },
    user_id   : { type : mongoose.Types.ObjectId, ref : "users" },
});

const post = mongoose.model("posts",  postsSchema);

module.exports = post;
