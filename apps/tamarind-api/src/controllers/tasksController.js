import { getTasks, createTask, updateTask, deleteTask, postNote, getNotes, deleteNote, updateNote, postList, getLists, updateList, deleteList } from "../models/tasksModel.js";

export async function listTasks(req, res){
    const userId = req.params.userId;
    try{
        const tasks = await getTasks(userId);
        res.status(200).json(tasks);
    } catch (error){
        console.log(error.message);
        res.status(500).json({"Error": "Request failed"});
    }
}
export async function sendNewTask(req, res){
    const newTask = req.body;
    try{
        const createdTask = await createTask(newTask);
        res.status(200).json(createdTask);
    } catch (error){
        console.log(error.message);
        res.status(500).json({"Error": "request failed"})
    }
}
export async function editTask(req, res){
    const id = req.params.id;
    if (id.length != 24) {
      res.status(400).json({ Error: "Invalid ID" });
      return;
    }
    try {
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            scheduleDate: req.body.scheduleDate,
            isCompleted: req.body.isCompleted,
            inProgress: req.body.inProgress
        };
        const taskUpdated = updateTask(id, newTask);
        res.status(200).json(taskUpdated)
    } catch (error){
        console.log(error.message);
        res.status(500).json({"Error:": "Request failed"});
    }
}
export async function removeTask(req, res){
    const id = req.params.id;
    if (id.length != 24) {
      res.status(400).json({ Error: "Invalid ID" });
      return;
    }
    try {
        const deletedTask = deleteTask(id);
        res.status(200).json(deletedTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error:": "Request failed"});
    }
}
export async function sendNewNote(req, res){
    const newNote = req.body;
    try{
        const response = await postNote(newNote);
        res.status(200).json(response);
    } catch (error){
        console.log(error.message);
        res.status(500).json({"Error": "Request failed"});
    }
}
export async function ListNotes(req, res){
    const userId = req.params.userId;
    try{
        const notes = await getNotes(userId);
        res.status(200).json(notes);
    } catch (error){
        console.log(error.message);
        res.status(500).json({"Error": "Request failed"});
    }
}
export async function removeNote(req, res){
    const noteId = req.params.noteId;
    if (noteId.length != 24) {
      res.status(400).json({ Error: "Invalid ID" });
      return;
    }
    try{
        const result = await deleteNote(noteId);
        res.status(200).json(result);
    } catch (error){
        console.log(error.message);
        res.status(500).json({"Error": "Request failed"});
    }
}
export async function editNote(req, res){
    const id = req.params.id;
    if (id.length != 24) {
      res.status(400).json({ Error: "Invalid ID" });
      return;
    }
    try{
        const newNote = {
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId,
            createdAt: req.body.createdAt 
        }
        const updatedNote = await updateNote(id, newNote);
        res.status(200).json(updatedNote);
    } catch (error){
        console.log(error.message);
        res.status(500).json({"Error": "Request failed"});
    }
}
export async function sendNewList(req, res){
    const newList = req.body;
    try{
        const response = await postList(newList);
        res.status(200).json(response);
    } catch (error){
        console.log(error.message);
        res.status(500).json({"Error": "Request failed"});
    }
}
export async function listLists(req,res){
    const userId = req.params.userId;
    try{
        const lists = await getLists(userId);
        res.status(200).json(lists);
    } catch (error){
        console.log(error.message);
        res.status(500).json({"Error": "Request failed"});
    }
}
export async function editList(req, res){
    const id = req.params.id;
    if (id.length != 24) {
      res.status(400).json({ Error: "Invalid ID" });
      return;
    }
    try{
        const newList = {
            tasksStatus: req.body.tasksStatus
        };
        const updatedList = await updateList(id, newList);
        res.status(200).json(updatedList);
    } catch (error){
        console.log(error.message);
        res.status(500).json({"Error": "Request failed"});
    }
}
export async function removeList(req, res){
    const listId = req.params.listID;
    if (listId.length != 24) {
      res.status(400).json({ Error: "Invalid ID" });
      return;
    }
    try {
      const result = await deleteList(listId);
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ Error: "Request failed" });
    }
}
// export async function postNewAccount(req, res){
//     const { email, passwordHash, name, createdAt } = req.body;
//     if (!email || !passwordHash || !name){
//         res.status(400).json({"Error": "Missing parameters"});
//         return;
//     }
//     try {
//         const newAccount = {
//             email,
//             passwordHash,
//             name,
//             createdAt
//         };
//         const createdAccount = await registerAccount(newAccount);
//         res.status(201).json(createdAccount);
//     } catch (error){
//         console.log(error.message);
//         res.status(500).json({"Error": "Request failed"});
//     }
// }