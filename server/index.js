import express from "express"

import app from "./server.js"
import { MongoClient } from "mongodb";
import BlogDAO from "./databaseAccess/blogDAO.js";

let PORT = process.env.VITE_PORT || 8080
let client = new MongoClient(process.env.MONGO_CLUSTER_URL);
//client.db().collection().find({}).

async function main() {
    try {
        //await BlogDAO.mongoConnect(client);
        app.listen(PORT, ()=>{
            console.log(`listening at ${PORT}`);
        })
    } catch(err) {
        console.error(`couldnt connect to server, ${err}`);
    }
}
main();
