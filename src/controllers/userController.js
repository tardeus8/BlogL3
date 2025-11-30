const { createUser, login } = require("../models/userModel");

async function createUserController(req, res) {
    const { username, password } = req.body;
    const result = await createUser(username, password);
    res.status(result.modelResult === "Success" ? 200 : 400).json(result);
}

async function loginController(req, res) {
    const { username, password } = req.body;
    const result = await login(username, password);
    if (result.modelResult === "Success") {
        req.session.user = { username, uuid: result.payload };
    }
    res.status(result.modelResult === "Success" ? 200 : 400).json(result);
}

async function logoutController(req, res) {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ modelResult: "Error", payload: "Failed to logout" });
        res.clearCookie("connect.sid");
        res.status(200).json({ modelResult: "Success", payload: "Logged out" });
    });
}

module.exports = {
    createUserController,
    loginController,
    logoutController,
};
