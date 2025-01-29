import axios from "axios"
export default class blogService {
    static async fetchAllBlogs() {
        return await axios.get("http://localhost:8080/api/v1/blogs");
    }

    static async fetchBlogById(id) {
        return await axios.get(`http://localhost:8080/api/v1/blogs/id/${id}`)
    }

    static async fetchCategories() {
        return await axios.get("http://localhost:8080/api/v1/blogs/tags");
    }
    static async fetchBlogsByCategories(tags, resultsPerPage, page) {
        return await axios.get(`http://localhost:8080/api/v1/blogs?tags=${tags}&resultsPerPage=${resultsPerPage}&page=${page}`);
    }
}
