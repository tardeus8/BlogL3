const Post = require("../schemas/postSchema");
const sanitize = require("sanitize-html");

async function createPost(title, content, author) {
    const post = new Post({ title: sanitize(title), content: sanitize(content), author });
    await post.save();
    return { modelResult: "Success", payload: "Post created" };
}

async function editPost(postID, title, content) {
    const post = await Post.findById(postID);
    if (!post) return { modelResult: "BadUserInput", payload: "Post not found" };
    post.title = sanitize(title);
    post.content = sanitize(content);
    post.editDate = new Date();
    await post.save();
    return { modelResult: "Success", payload: "Post updated" };
}

async function deletePost(postID) {
    await Post.findByIdAndDelete(postID);
    return { modelResult: "Success", payload: "Post deleted" };
}

async function listPosts() {
    const posts = await Post.aggregate([
        { $addFields: { sortDate: { $ifNull: ["$editDate", "$creationDate"] } } },
        { $sort: { sortDate: -1 } }
    ]);
    return { modelResult: "Success", payload: posts };
}

module.exports = {
    createPost,
    editPost,
    deletePost,
    listPosts,
};
