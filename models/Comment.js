const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    name:{
        type: String
    },
    body:{
        type: String,
        require: true
    }
});
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;