import axios from "axios"
export default class userRequests {
    static async createAccount(data) {
        //return await axios.post("http://localhost:8080/api/v1/users", data);
        return await axios.post("https://blogging-site-example.onrender.com/api/v1/users", data);
    }
    static async deleteAccount(id) {
        //return await axios.delete("http://localhost:8080/api/v1/users", {data:{id:id}}); 
        return await axios.delete("https://blogging-site-example.onrender.com/api/v1/users", {data:{id:id}});
    }
    static async signUser(data) {
        //return await axios.post("http://localhost:8080/api/v1/users/signin", data); 
        return await axios.post("https://blogging-site-example.onrender.com/api/v1/users/signin", data);
    }
    static async fetchAllUsers() {
        //return await axios.get("http://localhost:8080/api/v1/users"); 
        return await axios.get("https://blogging-site-example.onrender.com/api/v1/users");
    }
    static async fetchUserById(id) {
        //return await axios.get(`http://localhost:8080/api/v1/users/id/:${id}`); 
        return await axios.get(`https://blogging-site-example.onrender.com/api/v1/users/id/:${id}`);
    }
    static async viewProfile(token) {
        //return await axios.get(`http://localhost:8080/api/v1/users/profile/`, {headers:{Authorization:token}}); 
        return await axios.get("https://blogging-site-example.onrender.com/api/v1/users/profile", {headers:{Authorization:token}});
    }
    static async tokenAuthentication(token) {
        //return await axios.get(`http://localhost:8080/api/v1/users/home`, {headers:{Authorization:token}}); 
        return await axios.get("https://blogging-site-example.onrender.com/api/v1/users/home", {headers:{Authorization:token}});
    }
}