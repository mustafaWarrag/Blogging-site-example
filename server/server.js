import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"

import router from "./blog.routes.js";
configDotenv();

let app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.json({message:"hello there"})
})
app.use("/api/v1/blogs", router);


export default app;