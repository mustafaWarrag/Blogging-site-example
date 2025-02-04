import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import morgan from "morgan";

import blogRouter from "./routes/blog.routes.js";
import userRouter from "./routes/user.routes.js";


configDotenv();

let app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req,res) => {
    res.json({message:"hello there"})
})
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);


export default app;