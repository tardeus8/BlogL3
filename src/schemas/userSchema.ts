import { Schema, model } from "mongoose";

const userSchema = new Schema({
    uuid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});

export default model("User", userSchema);
