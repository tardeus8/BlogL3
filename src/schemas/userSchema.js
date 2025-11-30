const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    uuid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});

module.exports = model("User", userSchema);