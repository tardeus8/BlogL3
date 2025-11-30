import Post from "../schemas/postSchema";
import { Types } from "mongoose";
import sanitize from "sanitize-html";
import { modelResult } from "../types/modelResult";
import { resultStatus } from "../types/statusEnum";

export async function createPost(title: string, content: string, author: string): Promise<modelResult> {
    const post = new Post({ title: sanitize(title), content: sanitize(content), author });
    await post.save();
    return { modelResult: resultStatus.Success, payload: "Post created" };
}

export async function editPost(postID: Types.ObjectId, title: string, content: string): Promise<modelResult> {
    const post = await Post.findById(postID);
    if (!post) return { modelResult: resultStatus.BadUserInput, payload: "Post not found" };
    post.title = sanitize(title);
    post.content = sanitize(content);
    post.editDate = new Date();
    await post.save();
    return { modelResult: resultStatus.Success, payload: "Post updated" };
}

export async function deletePost(postID: Types.ObjectId): Promise<modelResult> {
    await Post.findByIdAndDelete(postID);
    return { modelResult: resultStatus.Success, payload: "Post deleted" };
}

export async function listPosts(): Promise<modelResult> {
    const posts = await Post.aggregate([
        { $addFields: { sortDate: { $ifNull: ["$editDate", "$creationDate"] } } },
        { $sort: { sortDate: -1 } }
    ]);
    return { modelResult: resultStatus.Success, payload: posts };
}
