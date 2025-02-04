//import userDAO from "../databaseAccess/userDAO.js";
import User from "../models/User.js";
import userServices from "../services/userServices.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export default class userController {
    static async apiCreateUser(req, res, next) {
        try {
            let password = req.body.password;
            let name = req.body.username;
            let email = req.body.email;
            if (password.length < 5) {
                throw new Error("error, password is too short");
            };
            if (await (User.findOne({username:name}))) {
                throw new Error("error, username already exists");
            }
            if (await (User.findOne({email:email}))) {
                throw new Error("error, email already registered");
            }

            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            const responseObject = {
                username:name,
                password:hashedPassword,
                email:email,
            }
            let newUser = new User(responseObject);
            //newUser.isModified()
            await newUser.save();
            res.json({status:"sucessfully created a user"});
        } catch (err) {
            res.status(500).json({message:"failed to create user " + err});
        }
    }
    static async apiUpdateUser(req, res, next) {
        try {
            let responseObj = {
                _id:req.body.id,
                username:req.body.username,
                password:req.body.password
            }
            let updateResponse = await User.updateOne(responseObj);
            let {error} = updateResponse;
            if (error) {
                throw new Error({error});
            }
            if (updateResponse.modifiedCount === 0) {
                throw new Error("error: ")
            }

        } catch(err) {
            res.status(500).json({message:"failed to update user " + err})
        }
    }

    static async apiDeleteUser(req, res, next) {
        try {
            let id = req.body.id;
            //await userDAO.deleteUser(id);
            let deleteResponse = await User.deleteOne({_id:id});
            if (deleteResponse.deletedCount === 0) {
                throw new Error("user may not exist");
            }
            res.json({status:"successfully deleted a user"})
        } catch(err) {
            res.status(500).json({message:"failed to delete user " + err});
        }
    }
    static async apiGetUsers(req, res, next) {
        try {
            //let allUsers = await userDAO.getUsers();
            let allUsers = await User.find({});
            res.json({users:allUsers});
        } catch(err) {
            res.status(500).json({message:"failed to get users " + err});
        }
    }
    static async apiGetUserById(req, res, next) {
        try {
            //let id = req.params.id;
            let id = req.body.id; //the JWT payload contains the id for the user
            let userResponse = await User.findOne({_id:id});
            if (!userResponse) {
                throw new Error("user not found");
            }
            res.json(userResponse);
        } catch(err) {
            res.status(500).json({message:"failed to get user by id: " + err});
        }
    }
    static async apiHandleSignin(req, res, next) {
            let userdata = {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            };
            userServices.authenticateUser(userdata).then((response) => {
                //res.json({status:response});
                let token = response.token;
                res.json({token})
            }).catch((err)=> {
                res.status(500).json({message:"failed to authenticate user: " + err})
            })
           
    }
}