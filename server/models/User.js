import { ObjectId } from "mongodb";
import cuid2 from "@paralleldrive/cuid2";
import mongoosey from "../config/db.js";
import pkg from "validator";
let isEmail = pkg.isEmail;

function emailValidator(required=true) {
    let schema = {
        type:String,
        required:required,
        unique:true,
        validate:{
            validator:isEmail,
            message: (properties) => `${properties.value} is not a valid email`
        }
    }
    return schema;
}

let User = mongoosey.model("User",{
    _id:{type:String, default:cuid2.createId()}, //for userId
    email:emailValidator(),
    username:{type:String, required:true},
    password:{type:String, required:true, minLength:5},
    registerDate:{type:Date, default: new Date()},
}, "blog_users")

export default User