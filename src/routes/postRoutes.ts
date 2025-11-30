import { Router } from "express";
import { createPostController, editPostController, deletePostController, listPostsController } from "../controllers/postController";

const router = Router();

router.post("/", createPostController);
router.put("/", editPostController);
router.delete("/:postID", deletePostController);
router.get("/", listPostsController);

export default router;
