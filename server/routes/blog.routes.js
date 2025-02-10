import express from "express"
import BlogsController from "../controllers/blogsController.js";
import blogMiddleware from "../middleware/blogMiddleware.js";

let router = express.Router();

router.route("/")
                 .get(BlogsController.apiGetBlogs)
                 .post(blogMiddleware.tokenVerified, BlogsController.apiCreateBlog)
                 .put(blogMiddleware.tokenVerified, BlogsController.apiUpdateBlog)
                 .delete(blogMiddleware.tokenVerified, BlogsController.apiDeleteBlog);

router.route("/id/:id").get(BlogsController.apiGetBlogById);
router.route("/tags").get(BlogsController.apiGetTags);
router.route("/author?").get(blogMiddleware.tokenVerified, BlogsController.apiGetBlogs);
export default router;