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
export async function deleteTask(taskId, userId){
    const dataBase = connection.db("todoDB");
    const collection = dataBase.collection("tasks");
    const objId = ObjectId.createFromHexString(taskId);
    try{
        const task = await collection.findOne({_id: objId, userId: userId});
        if(!task){
            res.status(403).json({message: "Access denied"});
            return;
        }
        return collection.deleteOne({_id: objId});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
    // return collection.deleteOne({_id: new ObjectId(objId)});
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
export async function deleteNote(noteId, userId){
    const database = connection.db("todoDB");
    const collection = database.collection("notes");
    const objId = ObjectId.createFromHexString(noteId);
    try{
        const note = await collection.findOne({_id: objId, userId: userId});
        if(!note){
            res.status(403).json({message: "Access denied"});
            return;
        }
        return collection.deleteOne({_id: objId});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}
export async function updateNote(id, newNote, userId){
    const database = connection.db("todoDB");
    const collection = database.collection("notes");
    const objId = ObjectId.createFromHexString(id);
    try{
        const note = await collection.findOne({_id: objId, userId: userId});
        if(!note){
            res.status(403).json({message: "Access denied"});
            return;
        }
        return collection.updateOne({_id: objId}, {$set: newNote});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
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
export async function updateList(id, newList, userId){
    const database = connection.db("todoDB");
    const collection = database.collection("lists");
    const objId = ObjectId.createFromHexString(id);
    try{
        const list = await collection.findOne({_id: objId, userId: userId});
        if(!list){
            res.status(403).json({message: "Access denied"});
            return;
        }
        return collection.updateOne({_id: objId}, {$set: newList});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}
export async function deleteList(listId, userId){
     const database = connection.db("todoDB");
     const collection = database.collection("lists");
     const objId = ObjectId.createFromHexString(listId);
     try{
        const list = await collection.findOne({_id: objId, userId: userId});
        if(!list){
            res.status(403).json({message: "Access denied"});
            return;
        }
        return collection.deleteOne({_id: objId});
     }catch(error){
        res.status(500).json({message: "Internal server error"});
     }
}
export async function postRoutine(newRoutine){
    const database = connection.db("todoDB");
    const collection = database.collection("routines");
    return collection.insertMany(newRoutine);
}
export async function getRoutines(userId){
    const dataBase = connection.db("todoDB");
    const collection = dataBase.collection("routines");
    const result = await collection.find({userId: userId}).toArray();
    return result;
}
export async function updateRoutine(id, isCompletedToday, userId){
    const database = connection.db("todoDB");
    const collection = database.collection("routines");
    const objId = ObjectId.createFromHexString(id);
    try{
        const routine = await collection.findOne({_id: objId, userId: userId});
        if(!routine){
            res.status(403).json({message: "Access denied"});
            return;
        }
        return collection.updateOne({_id: objId}, {$set: {isCompletedToday: isCompletedToday}});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}
export async function deleteRoutine(id, userId){
    const database = connection.db("todoDB");
    const collection = database.collection("routines");
    const objId = ObjectId.createFromHexString(id);
    try{
        const routine = await collection.findOne({_id: objId, userId: userId});
        if(!routine){
            res.status(403).json({message: "Access denied"});
            return;
        }
        return collection.deleteOne({_id: objId});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}