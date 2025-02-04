import { configDotenv } from "dotenv";
import mongo from "mongodb"
import mongoosey from "mongoose"

configDotenv();

await mongoosey.connect(process.env.MONGOOSE_URL).then(()=>{
    console.log("connected to database!")
}).catch((err)=>{
    console.error("unable to connect to database" + err);
});
//mongoosey.connection.collection("blogs");
export default mongoosey;