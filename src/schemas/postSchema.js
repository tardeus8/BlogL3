const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    editDate: { type: Date }
});

module.exports = model("Post", postSchema);