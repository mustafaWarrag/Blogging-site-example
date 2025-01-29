import cuid2 from "@paralleldrive/cuid2";
import mongoosey from "../db.js";
import { ObjectId } from "mongodb";
//console.log(ObjectId().toString())

const Blog = mongoosey.model("Blog", {
            _id:{type:String, default:(new ObjectId().toString())},
            author:{type:String, required:true},
            authorId:{type:String, default:cuid2.createId()},
            title:{type:String, required:true},
            content:{type:String, required:true},
            img:String,
            link:String,
            uploadDate:{type:Number, default:Date.now},
            tags:{type:[String], index:true, required:true}

}, "blogs");
let blogs;
export default class BlogDAO {
    if(blogs) {
            return blogs
    }
    static async mongoConnect(client) {
        
        try {
            blogs = await client.db(process.env.MONGO_DB_NAME).collection("blogs");
        } catch(err) {
            console.error("unable to connect to client," + err);
        }
    }

    static async getBlogs({filter=null, resultsPerPage=7, page=0}) {
        let query={};
        try {
            if (filter) {
                if ("tags" in filter) {
                    query = {"tags":{$eq:filter["tags"]}}
                }
            }
            let articles = await blogs
                                .find(query)
                                .limit(resultsPerPage)
                                .skip(page * resultsPerPage);
            let numOfBlogs = await blogs.countDocuments(filter);
            let blogList = await articles.toArray();
            return {blogList, numOfBlogs};
        } catch(err) {
            console.error("unable to get blogs : " + err);
            return 
        }
    }
    static async getBlogById(id) {
        try {
            let doc = await Blog.find({_id:id});
            return doc;
        } catch(err) {
            console.error("unable to get blog by id: " + err);
            return
        }
    }
    static async getTags() {
        try {
            let tags = await Blog.distinct("tags");
            return tags;
        } catch(err) {
            console.error("unable to get tags: " + err);
        }
    }

    static async createBlog(fields) {
        try {
            const article = await new Blog(fields).save();
            // or you could use await Blog.create(fields)
            // await Blog.insertMany(fields)
            return article
            
        }catch(err) {
            console.error("unable to create blog," + err);
            return
        }
    }
    static async updateBlog(id, authorId, title,content) {
        try {
            let updateDoc = await Blog.updateOne(
                {_id:id, authorId:authorId},
                {title:title, content:content});
            return updateDoc
        } catch(err) {
            console.error("unable to update blog: " + err);
            return
        }
    }
    static async deleteBlog(id, authorId) {
        try {
            let deleteDoc = await Blog.deleteOne({_id:id, authorId:authorId});
            return deleteDoc
        } catch(err) {
            console.error("unable to delete blog: " + err);
            return
        }
    }
}