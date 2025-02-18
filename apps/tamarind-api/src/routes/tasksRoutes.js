import express from "express";
import cors from "cors";
import { listTasks, sendNewTask, editTask, removeTask, sendNewNote, ListNotes, removeNote, editNote, sendNewList, listLists, editList, removeList } from "../controllers/tasksController.js";

const corsOptions = {
    origin: "http://localhost:3001",
    optionSuccessStatus: 200
};

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/tasks/:userId", listTasks);
    app.post("/tasks", sendNewTask);
    app.put("/tasks/:id", editTask);
    app.delete("/tasks/:id", removeTask);
    app.post("/notes", sendNewNote);
    app.get("/notes/:userId", ListNotes);
    app.delete("/notes/:noteId", removeNote);
    app.put("/notes/:id", editNote);
    app.post("/lists", sendNewList);
    app.get("/lists/:userId", listLists);
    app.put("/lists/:id", editList)
    app.delete("/lists/:listID", removeList);
    // app.post("/register", postNewAccount);
}

export default routes;