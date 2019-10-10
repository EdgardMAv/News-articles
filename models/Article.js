const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    link:{
        type: String,
        required: true
    },
    comment:[{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
})
let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;