//import BlogDAO from "../databaseAccess/blogDAO.js";
import Blog from "../models/Blog.js";

export default class BlogsController{
    static async apiGetBlogs(req,res,next) {
        try {
            let resultsPerPage = req.query.resultsPerPage? parseInt(req.query.resultsPerPage) : 7;
            let page = req.query.page? parseInt(req.query.page) : 0;
            let filter = {};
            if (req.query.tags) {
                filter.tags = req.query.tags;
            }
            if (req.body.authorId) {
                filter.authorId = req.body.authorId; 
            }
            let blogList = await Blog.find(filter)
                                     .limit(resultsPerPage)
                                     .skip(page);
            let numOfBlogs = await Blog.countDocuments(filter); 
            if (!blogList) {
                throw new Error("blog does not exist");
            }
            //let {blogList, numOfBlogs} = await BlogDAO.getBlogs({filter:filter, resultsPerPage:resultsPerPage, page:page});
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
            //let doc = await BlogDAO.getBlogById(id);
            let doc = await Blog.findOne({_id:id});
            res.json({blog:doc});
        } catch(err) {
            res.status(500).json({message:"error, cant get blog by id: " + err});
        }
    }
    static async apiGetTags(req, res, next) {
        try {
            //let tags = await BlogDAO.getTags();
            let tags = await Blog.distinct("tags");
            res.json({tags:tags});
        } catch(err) {
            res.status(500).json({message:"error, cant get tags: " + err});
        }
    }

    static async apiCreateBlog(req, res, next) {
        try {
            let author = req.body.author;
            let authorId = req.body.authorId;
            let title = req.body.title || "default blog title"
            let content = req.body.content || "Lorem lorem lorem lorem";
            let img = req.body.img || "";
            let imgLink = req.body.imgLink || "";
            let date = req.body.date || new Date();
            let tags = req.body.tags || [];
            //BlogDAO.createBlog({
            let newBlog = new Blog({
                author:author,
                authorId:authorId, 
                title:title,
                content:content,
                img:img,
                link:imgLink,
                date:date,
                tags:tags
            });
            await newBlog.save();
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
            //let updatedDoc = await BlogDAO.updateBlog(id, authorId, title, content);
            let updatedDoc = await Blog.updateOne(
                {_id:id, authorId:authorId}, {title:title, content:content})
            res.json({status:"successfully updated blog"});
        } catch(err) {
            res.status(500).json({message:"failed to update blog: " + err});
        }
    }
    static async apiDeleteBlog(req, res, next) {
        try {
            let id = req.body.id;
            let authorId = req.body.authorId;
            //await BlogDAO.deleteBlog(id, authorId);
            let deleteDoc = Blog.deleteOne({_id:id, authorId:authorId})
            res.json({status:"successfully deleted blog"});
        } catch(err) {
            res.status(500).json({message:"failed to delet blog: " + err})
        }
    }
} 


