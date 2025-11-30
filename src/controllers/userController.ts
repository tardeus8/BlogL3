import { Request, Response } from "express";
import { createUser, login } from "../models/userModel";
import { resultStatus } from "../types/statusEnum";

export async function createUserController(req: Request, res: Response) {
    const { username, password } = req.body;
    const result = await createUser(username, password);
    res.status(result.modelResult === resultStatus.Success ? 200 : 400).json(result)
}

export async function loginController(req: Request, res: Response) {
    const { username, password } = req.body;
    const result = await login(username, password);
    if (result.modelResult === resultStatus.Success) {
        req.session.user = { username, uuid: result.payload };
    }
    res.status(result.modelResult === resultStatus.Success ? 200 : 400).json(result);
}

export async function logoutController(req: Request, res: Response) {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ modelResult: "Error", payload: "Failed to logout" });
        res.clearCookie("connect.sid");
        res.status(200).json({ modelResult: "Success", payload: "Logged out" });
    });
}
