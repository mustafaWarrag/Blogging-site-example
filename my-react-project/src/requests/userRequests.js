import axios from "axios"
export default class userRequests {
    static async createAccount(data) {
        return await axios.post("http://localhost:8080/api/v1/users", data)
    }
    static async deleteAccount(id) {
        return await axios.delete("http://localhost:8080/api/v1/users", {data:{id:id}})
    }
    static async signUser(data) {
        return await axios.post("http://localhost:8080/api/v1/users/signin", data)
    }
    static async fetchAllUsers() {
        return await axios.get("http://localhost:8080/api/v1/users")
    }
    static async fetchUserById(id) {
        return await axios.get(`http://localhost:8080/api/v1/users/id/:${id}`);
    }
    static async viewProfile(token) {
        return await axios.get(`http://localhost:8080/api/v1/users/profile/`, {
            headers:{Authorization:token} 
        });
        //then store the token as a cookie or in local storage
    }
}