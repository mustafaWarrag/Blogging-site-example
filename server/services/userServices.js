import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken"


export default class userServices {
    static async isMatch(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    static async authenticateUser(userdata) {
        let emailResponse = await User.findOne({email:userdata.email});
        if (!emailResponse) {
            throw new Error("Email does not exist")
        };
        
        //let dbResponse = await User.findOne({_id:userdata.id});
        let inputtedPassword = userdata.password;
        let passwordInDatabase = await emailResponse.get("password");
        if (!(await this.isMatch(inputtedPassword, passwordInDatabase))) {
            throw new Error("Invalid Credentials");
        };
        let id = emailResponse.get("_id");
        const token = await jwt.sign({_id:id}, process.env.JWT_SECRET_KEY, {expiresIn:"5h", algorithm:"HS256"});
        //the JWT contains the user_id as its payload
        //after verifying the token, attach the user_id to the req.body
        //then the controller can fetch the id from the database using the req.body
        return {emailResponse, token}
    }
}