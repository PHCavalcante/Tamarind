import { ObjectId } from "mongodb";
import connectToDb from "../config/dbconfig.js";

const connection = await connectToDb(process.env.STRING_CONNECTION);

export async function getTasks(userId){
    const dataBase = connection.db("todoDB");
    const collection = dataBase.collection("tasks");
    const result =  await collection.find({userId: userId}).toArray();
    return result;
}
export async function createTask(newTask){
    const dataBase = connection.db("todoDB");
    const collection = dataBase.collection("tasks");
    return collection.insertOne(newTask);
}
export async function updateTask(id, newTask){
    const dataBase = connection.db("todoDB");
    const collection = dataBase.collection("tasks");
    const objId = ObjectId.createFromHexString(id);
    return collection.updateOne({_id: new ObjectId(objId)}, {$set: newTask});
}
export async function deleteTask(id){
    const dataBase = connection.db("todoDB");
    const collection = dataBase.collection("tasks");
    const objId = ObjectId.createFromHexString(id);
    return collection.deleteOne({_id: new ObjectId(objId)});
}
// export async function registerAccount(newAccount){
//     const dataBase = connection.db("todoDB");
//     const collection = dataBase.collection("users");
//     return collection.insertOne(newAccount);
// }
export async function postNote(newNote){
    const dataBase = connection.db("todoDB");
    const collection = dataBase.collection("notes");
    return collection.insertOne(newNote);
}
export async function getNotes(userId){
    const dataBase = connection.db("todoDB");
    const collection = dataBase.collection("notes");
    const result = await collection.find({userId: userId}).toArray();
    return result;
}
export async function deleteNote(noteId){
    const database = connection.db("todoDB");
    const collection = database.collection("notes");
    const objId = ObjectId.createFromHexString(noteId);
    const result = await collection.deleteOne({_id: new ObjectId(objId)});
    return result; 
}
export async function updateNote(id, newNote){
    const database = connection.db("todoDB");
    const collection = database.collection("notes");
    const objId = ObjectId.createFromHexString(id);
    const result = await collection.updateOne({_id: new ObjectId(objId)}, {$set: newNote})
    return result;
}
export async function postList(newList){
    const database = connection.db("todoDB");
    const collection = database.collection("lists");
    return collection.insertOne(newList);
}
export async function getLists(userId){
    const dataBase = connection.db("todoDB");
    const collection = dataBase.collection("lists");
    const result = await collection.find({ userId: userId }).toArray();
    return result;
}
export async function updateList(id, newList){
    const database = connection.db("todoDB");
    const collection = database.collection("lists");
    const objId = ObjectId.createFromHexString(id);
    const result = await collection.updateOne({_id: new ObjectId(objId)}, {$set: newList});
    return result;   
}
export async function deleteList(listId){
     const database = connection.db("todoDB");
     const collection = database.collection("lists");
     const objId = ObjectId.createFromHexString(listId);
     const result = await collection.deleteOne({ _id: new ObjectId(objId) });
     return result; 
}