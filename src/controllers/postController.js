const { createPost, editPost, deletePost, listPosts } = require("../models/postModel");
const { Types } = require("mongoose");

function isAuthenticated(req) {
    return req.session && req.session.user;
}

async function createPostController(req, res) {
    if (!isAuthenticated(req)) return res.status(401).json({ modelResult: "BadUserInput", payload: "Not logged in" });
    const { title, content } = req.body;
    const authorName = req.session.user.username;
    const result = await createPost(title, content, authorName);
    res.status(result.modelResult === "Success" ? 200 : 400).json(result);
}

async function editPostController(req, res) {
    if (!isAuthenticated(req)) return res.status(401).json({ modelResult: "BadUserInput", payload: "Not logged in" });
    const { postID, title, content } = req.body;
    if (!Types.ObjectId.isValid(postID)) return res.status(400).json({ modelResult: "BadUserInput", payload: "Invalid postID" });
    const result = await editPost(new Types.ObjectId(postID), title, content);
    res.status(result.modelResult === "Success" ? 200 : 400).json(result);
}

async function deletePostController(req, res) {
    if (!isAuthenticated(req)) return res.status(401).json({ modelResult: "BadUserInput", payload: "Not logged in" });
    const { postID } = req.params;
    if (!Types.ObjectId.isValid(postID)) return res.status(400).json({ modelResult: "BadUserInput", payload: "Invalid postID" });
    const result = await deletePost(new Types.ObjectId(postID));
    res.status(result.modelResult === "Success" ? 200 : 400).json(result);
}

async function listPostsController(req, res) {
    const result = await listPosts();
    res.status(result.modelResult === "Success" ? 200 : 400).json(result);
}

module.exports = {
    createPostController,
    editPostController,
    deletePostController,
    listPostsController,
};
