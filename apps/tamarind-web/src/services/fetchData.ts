import axios from "axios";
import { taskTypes, noteTypes, listTypes } from "@/types/dataTypes";

export async function fetchData(userId: string){
    try{
        const response = await axios.get(
          `https://tamarind-api.onrender.com/${userId}`
        );
        return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function postTask(newTask: taskTypes){
    try{
        const response = await axios.post(
          "https://tamarind-api.onrender.com/tasks",
          newTask
        );
        console.log(response);
        return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function updateTask(task : taskTypes){
    try{
        const response = await axios.put(
          `https://tamarind-api.onrender.com/tasks/${task._id}`,
          {
            title: task.title,
            description: task.description,
            scheduleDate: task.scheduleDate,
            isCompleted: task.isCompleted,
            type: task.type,
            inProgress: task.inProgress,
          }
        );
            console.log(response);
            return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function markTaskAsCompleted(task: taskTypes){
    try{
        const response = await axios.put(
          `https://tamarind-api.onrender.com/tasks/${task._id}`,
          {
            title: task.title,
            description: task.description,
            scheduleDate: task.scheduleDate,
            isCompleted: true,
          }
        );
            console.log(response);
            return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function deleteTask(taskId : string){
    try{
        const response = await axios.delete(
          `https://tamarind-api.onrender.com/tasks/${taskId}`
        );
        return response;
    } catch (error){
        console.error(error);
    }
}
export async function postNote(newNote:noteTypes){
    try{
        const response = await axios.post(
          "https://tamarind-api.onrender.com/notes",
          newNote
        );
        console.log(response);
        return response;
    } catch (error){
        console.error(error);
    }
}
export async function deleteNote(noteId: string){
    try{
        const response = await axios.delete(
          `https://tamarind-api.onrender.com/notes/${noteId}`
        );
        console.log(response);
        return response;
    } catch (error){
        console.log(error);
    }
}
export async function updateNote(note: noteTypes){
    try{
        const response = await axios.put(
          `https://tamarind-api.onrender.com/notes/${note._id}`,
          {
            title: note.title,
            description: note.description,
            createdAt: note.createdAt,
            userId: note.userId,
          }
        );
        console.log(response);
        return response;
    } catch (error){
        console.log(error);
    }
}
export async function postList(newList: listTypes){
    try{
        const response = await axios.post(
          "https://tamarind-api.onrender.com/lists",
          newList
        );
        console.log(response);
        return response;
    } catch (error){
        console.log(error);
    }
}
export async function updateList(listId: string, tasksStatus : boolean[]){
    try{
        const response = await axios.put(
          `https://tamarind-api.onrender.com/lists/${listId}`,
          {
            tasksStatus: tasksStatus,
          }
        );
        console.log(response);
        return response;
    } catch (error){
        console.log(error);
    }
}
export async function deleteList(listId: string){
     try {
       const response = await axios.delete(
         `https://tamarind-api.onrender.com/lists/${listId}`
       );
       console.log(response);
       return response;
     } catch (error) {
       console.log(error);
     }
}