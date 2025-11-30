import { Router, Request, Response } from "express";
import { listPosts } from "../models/postModel";

const router = Router();

// Перевірка авторизації
function isAuthenticated(req: Request) {
    return req.session && req.session.user;
}

// Головна сторінка
router.get("/", async (req: Request, res: Response) => {
    const { payload } = await listPosts()
    res.render("Home", { user: req.session.user, posts: payload});
});

// Сторінка логіну/реєстрації
router.get("/auth", (req: Request, res: Response) => {
    res.render("Auth", { user: req.session.user });
});

export default router;
