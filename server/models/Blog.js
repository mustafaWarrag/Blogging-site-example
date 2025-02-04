import mongoosey from "../config/db.js";
import { ObjectId } from "mongodb";
import cuid2 from "@paralleldrive/cuid2";

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

export default Blog;