const { Router } = require("express");
const { listPosts } = require("../models/postModel");

const router = Router();

// Перевірка авторизації
function isAuthenticated(req) {
    return req.session && req.session.user;
}

// Головна сторінка
router.get("/", async (req, res) => {
    const { payload } = await listPosts();
    res.render("Home", { user: req.session.user, posts: payload });
});

// Сторінка логіну/реєстрації
router.get("/auth", (req, res) => {
    res.render("Auth", { user: req.session.user });
});

module.exports = router;
