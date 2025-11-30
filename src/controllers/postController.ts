import { Request, Response } from "express";
import { Types } from "mongoose";
import { createPost, editPost, deletePost, listPosts } from "../models/postModel";
import { resultStatus } from "../types/statusEnum";

function isAuthenticated(req: Request) {
    return req.session && req.session.user;
}

export async function createPostController(req: Request, res: Response) {
    if (!isAuthenticated(req)) return res.status(401).json({ modelResult: resultStatus.BadUserInput, payload: "Not logged in" });
    const { title, content } = req.body;
    const authorName = req.session.user!.username;
    const result = await createPost(title, content, authorName);
    res.status(result.modelResult === resultStatus.Success ? 200 : 400).json(result);
}

export async function editPostController(req: Request, res: Response) {
    if (!isAuthenticated(req)) return res.status(401).json({ modelResult: "BadUserInput", payload: "Not logged in" });
    const { postID, title, content } = req.body;
    if (!Types.ObjectId.isValid(postID)) return res.status(400).json({ modelResult: "BadUserInput", payload: "Invalid postID" });
    const result = await editPost(new Types.ObjectId(postID), title, content);
    res.status(result.modelResult === resultStatus.Success ? 200 : 400).json(result);
}

export async function deletePostController(req: Request, res: Response) {
    if (!isAuthenticated(req)) return res.status(401).json({ modelResult: "BadUserInput", payload: "Not logged in" });
    const { postID } = req.params;
    if (!Types.ObjectId.isValid(postID)) return res.status(400).json({ modelResult: "BadUserInput", payload: "Invalid postID" });
    const result = await deletePost(new Types.ObjectId(postID));
    res.status(result.modelResult === resultStatus.Success ? 200 : 400).json(result);
}

export async function listPostsController(req: Request, res: Response) {
    const result = await listPosts();
    res.status(result.modelResult === resultStatus.Success ? 200 : 400).json(result);
}
