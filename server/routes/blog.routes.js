import express from "express"
import BlogsController from "../controllers/blogsController.js";

let router = express.Router();

router.route("/")
                 .get(BlogsController.apiGetBlogs)
                 .post(BlogsController.apiCreateBlog)
                 .put(BlogsController.apiUpdateBlog)
                 .delete(BlogsController.apiDeleteBlog);

router.route("/id/:id").get(BlogsController.apiGetBlogById);
router.route("/tags").get(BlogsController.apiGetTags);
export default router;