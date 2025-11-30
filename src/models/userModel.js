const User = require("../schemas/userSchema");
const { v7: uuidv7 } = require("uuid");
const argon2 = require("argon2");
const sanitize = require("sanitize-html");

async function createUser(username, password) {
    const uuid = uuidv7();
    const passwordHash = await argon2.hash(password);
    username = sanitize(username);

    const user = new User({ uuid, username, passwordHash });
    try {
        await user.save();
        return { modelResult: "Success", payload: "User created" };
    } catch (err) {
        if (err && err.code === 11000) return { modelResult: "BadUserInput", payload: "Username already used" };
        return { modelResult: "Error", payload: (err && err.message) || "Unknown error" };
    }
}

async function login(username, password) {
    try {
        const user = await User.findOne({ username }, { passwordHash: 1, uuid: 1, _id: 0 }).lean();
        if (!user || !(await argon2.verify(user.passwordHash, password))) {
            return { modelResult: "BadUserInput", payload: "Invalid credentials" };
        }
        return { modelResult: "Success", payload: user.uuid };
    } catch (err) {
        return { modelResult: "Error", payload: (err && err.message) || "Unknown error" };
    }
}

module.exports = {
    createUser,
    login,
};
