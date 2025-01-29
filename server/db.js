import { configDotenv } from "dotenv";
import mongo from "mongodb"
import mongoosey from "mongoose"

configDotenv();

mongoosey.connect(process.env.MONGOOSE_URL);
//mongoosey.connection.collection("blogs");
export default mongoosey;