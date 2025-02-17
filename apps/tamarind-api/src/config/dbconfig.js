import { MongoClient } from "mongodb";

export default async function connectToDb(stringConnection){
    let mongoClient;
    try{
        mongoClient = new MongoClient(stringConnection);
        console.log("Connecting to mongoDb cluster...");
        await mongoClient.connect();
        console.log("Successfully connected to mongoDb!");
        return mongoClient;
    } catch(error){
        console.log("Failed to connect to mongoDb!", error);
        process.exit();
    }
}