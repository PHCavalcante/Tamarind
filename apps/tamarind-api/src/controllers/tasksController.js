import { getAuth } from "@clerk/express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  postNote,
  getNotes,
  deleteNote,
  updateNote,
  postList,
  getLists,
  updateList,
  deleteList,
  postRoutine,
  getRoutines,
  updateRoutine,
  deleteRoutine,
} from "../models/tasksModel.js";

export async function listTasks(req, res) {
//   const userId = req.params.userId;
  const { userId } = getAuth(req);
  try {
    const tasks = await getTasks(userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}
export async function sendNewTask(req, res) {
  const { userId } = getAuth(req);
  const newTask = req.body;
  newTask.userId = userId;
  try {
    const createdTask = await createTask(newTask);
    res.status(200).json(createdTask);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "request failed" });
  }
}
export async function editTask(req, res) {
  const { userId } = getAuth(req);
  const id = req.params.id;
  if (id.length != 24) {
    res.status(400).json({ Error: "Invalid ID" });
    return;
  }
  try {
    const newTask = {
      userId: userId,
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      scheduleDate: req.body.scheduleDate,
      isCompleted: req.body.isCompleted,
      inProgress: req.body.inProgress,
    };
    const taskUpdated = updateTask(id, newTask);
    res.status(200).json(taskUpdated);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ "Error:": "Request failed" });
  }
}
export async function removeTask(req, res) {
const { userId } = getAuth(req);
const id = req.params.id;
  if (id.length != 24) {
    res.status(400).json({ Error: "Invalid ID" });
    return;
  }
  try {
    const deletedTask = deleteTask(id, userId);
    res.status(200).json(deletedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error:": "Request failed" });
  }
}
export async function sendNewNote(req, res) {
  const { userId } = getAuth(req);
  const newNote = req.body;
  newNote.userId = userId;
  try {
    const response = await postNote(newNote);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}
export async function ListNotes(req, res) {
  const { userId } = getAuth(req);
  try {
    const notes = await getNotes(userId);
    res.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}
export async function removeNote(req, res) {
  const { userId } = getAuth(req);
  const noteId = req.params.noteId;
  if (noteId.length != 24) {
    res.status(400).json({ Error: "Invalid ID" });
    return;
  }
  try {
    const result = await deleteNote(noteId, userId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}
export async function editNote(req, res) {
  const { userId } = getAuth(req);
  const id = req.params.id;
  if (id.length != 24) {
    res.status(400).json({ Error: "Invalid ID" });
    return;
  }
  try {
    const newNote = {
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId,
      createdAt: req.body.createdAt,
    };
    const updatedNote = await updateNote(id, newNote, userId);
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}
export async function sendNewList(req, res) {
  const { userId } = getAuth(req);
  const newList = req.body;
  newList.userId = userId;
  try {
    const response = await postList(newList, userId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}
export async function listLists(req, res) {
  const { userId } = getAuth(req);
  try {
    const lists = await getLists(userId);
    res.status(200).json(lists);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}
export async function editList(req, res) {
  const { userId } = getAuth(req);
  const id = req.params.id;
  if (id.length != 24) {
    res.status(400).json({ Error: "Invalid ID" });
    return;
  }
  try {
    const newList = {
      tasksStatus: req.body.tasksStatus,
    };
    const updatedList = await updateList(id, newList, userId);
    res.status(200).json(updatedList);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}
export async function removeList(req, res) {
  const { userId } = getAuth(req);
  const listId = req.params.listID;
  if (listId.length != 24) {
    res.status(400).json({ Error: "Invalid ID" });
    return;
  }
  try {
    const result = await deleteList(listId, userId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}
export async function sendNewRoutine(req, res) {
  const { userId } = getAuth(req);
  const routines = req.body;
  console.log("Routines before mapping:", routines);
  routines.map((routine) => {
    routine.userId = userId;
  });
  const newRoutine = routines;
  console.log("Routines after mapping:", newRoutine);
  if (!newRoutine) {
    res.status(400).json({ Error: "Missing parameters" });
    return;
  }
  try {
    const response = await postRoutine(newRoutine);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}
export async function listRoutines(req, res) {
  const { userId } = getAuth(req);
  try {
    const routines = await getRoutines(userId);
    res.status(200).json(routines);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}
export async function handleToggleRoutine(req, res) {
  const { userId } = getAuth(req);
  const id = req.params.id;
  const isCompletedToday = req.body.isCompletedToday;
  if (id.length != 24) {
    res.status(400).json({ Error: "Invalid ID" });
    return;
  }
  if (typeof isCompletedToday !== "boolean") {
    res.status(400).json({ Error: "isCompletedToday must be a boolean" });
    return;
  }
  try {
    const updatedRoutine = await updateRoutine(id, isCompletedToday, userId);
    return updatedRoutine;
  } catch (error) {
    console.log(error.message);
    throw new Error("Request failed");
  }
}
export async function removeRoutine(req, res) {
  const { userId } = getAuth(req);
  const id = req.params.id;
  if (id.length != 24) {
    res.status(400).json({ Error: "Invalid ID" });
    return;
  }
  try {
    const deletedRoutine = await deleteRoutine(id, userId);
    res.status(200).json(deletedRoutine);
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
