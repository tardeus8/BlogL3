const { Router } = require("express");
const { createPostController, editPostController, deletePostController, listPostsController } = require("../controllers/postController");

const router = Router();

router.post("/", createPostController);
router.put("/", editPostController);
router.delete("/:postID", deletePostController);
router.get("/", listPostsController);

module.exports = router;
