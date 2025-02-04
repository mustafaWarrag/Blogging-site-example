import User from "../models/User.js";

export default class userDAO {
    static async createUser(fields) {
        try {
            let newUser = new User(fields);
            await newUser.save();
            return newUser
        } catch(err) {
            console.error("unable to create user " + err)
        }
    }
    static async deleteUser(id) {
        try {
            let deleteResponse = await User.deleteOne({_id:id});
            return deleteResponse;
        } catch(err) {
            console.error("unable to delete user " + err);
        }
    }
    
    static async getUsers() {
        try {
            let allUsers = await User.find({})
            return allUsers;
        } catch(err) {
            console.error("unable to get users " + err);
        }
    }
}