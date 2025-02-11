import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import morgan from "morgan";

import blogRouter from "./routes/blog.routes.js";
import userRouter from "./routes/user.routes.js";

const renderIp = [process.env.IP_1, process.env.IP_2, process.env.IP_3]; //add local IP later

configDotenv();

let app = express();
app.use(express.json());
//app.use(cors())
app.use(cors({origin:"blogging-site-example.netlify.app"})); //only allow the website to fetch the data

app.use((req, res, next) => {
    if (!renderIp.includes(req.ip)) { //if IP address of the person who accessed the server isn't one of the whitelisted ones
        res.status(403).json({message:"Access Denied"}); //then deny response
    }
    next();
})
app.use(morgan("dev"));

app.get("/", (req,res) => {
    res.json({message:"hello there"})
})
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);


export default app;