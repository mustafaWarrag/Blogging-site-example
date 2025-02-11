import express from "express"
import userController from "../controllers/userController.js";
import userMiddleware from "../middleware/userMiddleware.js";

let userRouter = express.Router();

userRouter.route("/")//.get(userController.apiGetUsers)
                     .post(userController.apiCreateUser)
                     //.delete(userController.apiDeleteUser);
                     ;
userRouter.route("/id/:id").get(userController.apiGetUserById);
userRouter.route("/signin").post(userController.apiHandleSignin);
userRouter.route("/profile").get(userMiddleware.tokenVerify, userController.apiGetUserById);
userRouter.route("/home").get(userMiddleware.tokenVerify, userMiddleware.homeVerify);

export default userRouter
