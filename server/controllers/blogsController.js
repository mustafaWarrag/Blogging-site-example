import BlogDAO from "../databaseAccess/blogDAO.js";

export default class BlogsController{
    static async apiGetBlogs(req,res,next) {
        try {
            let resultsPerPage = req.query.resultsPerPage? parseInt(req.query.resultsPerPage) : 7;
            let page = req.query.page? parseInt(req.query.page) : 0;
            let filter = {};
            if (req.query.tags) {
                filter.tags = req.query.tags;
            }
            let {blogList, numOfBlogs} = await BlogDAO.getBlogs({filter:filter, resultsPerPage:resultsPerPage, page:page});
            let response = {
                blogs:blogList,
                filter:filter,
                page:page,
                resultsPerPage:resultsPerPage,
                entries_per_page:numOfBlogs,
            }
            res.json(response);
        } catch(err) {
            res.status(500).json({message:"error, cant get blogs :" + err});
        }
    }
    static async apiGetBlogById(req, res, next) {
        try {
            //let id = req.params.id || "67977d25b89650d6a90efc55";
            let id = req.params.id;
            let doc = await BlogDAO.getBlogById(id);
            res.json({blog:doc});
        } catch(err) {
            res.status(500).json({message:"error, cant get blog by id: " + err});
        }
    }
    static async apiGetTags(req, res, next) {
        try {
            let tags = await BlogDAO.getTags();
            res.json({tags:tags});
        } catch(err) {
            res.status(500).json({message:"error, cant get tags: " + err});
        }
    }

    static async apiCreateBlog(req, res, next) {
        try {
            let author = req.body.author;
            //let authorId = req.body.authorId;
            let title = req.body.title || "default blog title"
            let content = req.body.content || "Lorem lorem lorem lorem";
            let img = req.body.img || "";
            let imgLink = req.body.imgLink || "";
            let date = req.body.date || new Date();
            let tags = req.body.tags || [];
            BlogDAO.createBlog({
                author:author,
                //authorId:authorId, 
                title:title,
                content:content,
                img:img,
                link:imgLink,
                date:date,
                tags:tags
            });
            res.json({status:"successfully created a blog"});

        } catch(err) {
            res.status(500).json({message:"failed to create blog" + err});
        }
    }
    static async apiUpdateBlog(req, res, next) {
        try {
            let id = req.body.id;
            let authorId = req.body.authorId;
            let title = req.body.title;
            let content = req.body.content;
            let updatedDoc = await BlogDAO.updateBlog(id, authorId, title, content);
            res.json({status:"successfully updated blog"});
        } catch(err) {
            res.status(500).json({message:"failed to update blog: " + err});
        }
    }
    static async apiDeleteBlog(req, res, next) {
        try {
            let id = req.body.id;
            let authorId = req.body.authorId;
            await BlogDAO.deleteBlog(id, authorId);
            res.json({status:"successfully deleted blog"});
        } catch(err) {
            res.status(500).json({message:"failed to delet blog: " + err})
        }
    }
} 


