import { requireAuth } from "@clerk/express";
import {
  listTasks,
  sendNewTask,
  editTask,
  removeTask,
  sendNewNote,
  ListNotes,
  removeNote,
  editNote,
  sendNewList,
  listLists,
  editList,
  removeList,
  sendNewRoutine,
  listRoutines,
  handleToggleRoutine,
  removeRoutine
} from "../controllers/tasksController.js";

const routes = (app) => {
    app.get("/tasks", requireAuth(), listTasks);
    app.post("/tasks", requireAuth(), sendNewTask);
    app.put("/tasks/:id", requireAuth(), editTask);
    app.delete("/tasks/:id", requireAuth(), removeTask);
    app.post("/notes", requireAuth(), sendNewNote);
    app.get("/notes", requireAuth(), ListNotes);
    app.delete("/notes/:noteId", requireAuth(), removeNote);
    app.put("/notes/:id", requireAuth(), editNote);
    app.post("/lists", requireAuth(), sendNewList);
    app.get("/lists", requireAuth(), listLists);
    app.delete("/lists/:listID", requireAuth(), removeList);
    app.put("/lists/:id", requireAuth(), editList);
    app.post("/routines", requireAuth(), sendNewRoutine);
    app.get("/routines", requireAuth(), listRoutines);
    app.patch("/routines/:id", requireAuth(), handleToggleRoutine);
    app.delete("/routines/:id", requireAuth(), removeRoutine);
    app.get("/ping", (req, res) => {
      res.status(200).send("pong");
    })
    // app.post("/register", postNewAccount);
}

export default routes;