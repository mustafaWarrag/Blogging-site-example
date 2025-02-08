import axios from "axios"
export default class blogRequests {
    static async fetchAllBlogs() {
        //return await axios.get("http://localhost:8080/api/v1/blogs");
        return await axios.get("https://blogging-site-example.onrender.com/api/v1/blogs");
    }

    static async fetchBlogById(id) {
        //return await axios.get(`http://localhost:8080/api/v1/blogs/id/${id}`)
        return await axios.get(`https://blogging-site-example.onrender.com/api/v1/blogs/id/${id}`)
    }
    static async fetchBlogsByAuthor(token) {
        //return await axios.get(`http://localhost:8080/api/v1/blogs/author`, {headers:{Authorization:token}});
        return await axios.get(`https://blogging-site-example.onrender.com/api/v1/blogs/author`, {headers:{Authorization:token}})
        
    }

    static async fetchCategories() {
        //return await axios.get("http://localhost:8080/api/v1/blogs/tags");
        return await axios.get("https://blogging-site-example.onrender.com/api/v1/blogs/tags");
    }
    static async fetchBlogsByCategories(tags, resultsPerPage, page) {
        //return await axios.get(`http://localhost:8080/api/v1/blogs?tags=${tags}&resultsPerPage=${resultsPerPage}&page=${page}`);
        return await axios.get(`https://blogging-site-example.onrender.com/api/v1/blogs?tags=${tags}&resultsPerPage=${resultsPerPage}&page=${page}`);
    }

    static async createBlog(data, token) {
        //return await axios.post("http://localhost:8080/api/v1/blogs", data, {headers:{Authorization:token}});
        return await axios.post("https://blogging-site-example.onrender.com/api/v1/blogs", data, {headers:{Authorization:token}} );
    }
}
