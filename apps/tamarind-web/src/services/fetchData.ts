import axios from "axios";
import { taskTypes, noteTypes, listTypes, RoutineType } from "@/types/dataTypes";

export async function fetchTasks(token: string){
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function postTask(newTask: taskTypes, token: string){
    try{
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
          newTask,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function updateTask(task : taskTypes, token: string){
    try{
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task._id}`,
          {
            title: task.title,
            description: task.description,
            scheduleDate: task.scheduleDate,
            isCompleted: task.isCompleted,
            type: task.type,
            inProgress: task.inProgress,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
            return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function markTaskAsCompleted(task: taskTypes, token: string){
  console.log("Marking task as completed:", task);
    try{
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task._id}`,
          {
            title: task.title,
            description: task.description,
            scheduleDate: task.scheduleDate,
            isCompleted: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
            return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function deleteTask(taskId : string, token: string){
    try{
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
    } catch (error){
        console.error(error);
    }
}
export async function fetchNotes(token: string){
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function postNote(newNote:noteTypes, token: string){
    try{
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/notes`,
          newNote,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
    } catch (error){
        console.error(error);
    }
}
export async function deleteNote(noteId: string, token: string){
    try{
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
    } catch (error){
        console.log(error);
    }
}
export async function updateNote(note: noteTypes, token: string){
    try{
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/${note._id}`,
          {
            title: note.title,
            description: note.description,
            createdAt: note.createdAt,
            userId: note.userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
    } catch (error){
        console.log(error);
    }
}
export async function fetchLists(token: string){
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/lists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function postList(newList: listTypes, token: string){
    try{
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/lists`,
          newList,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
    } catch (error){
        console.log(error);
    }
}
export async function updateList(listId: string, tasksStatus : boolean[], token: string){
    try{
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/lists/${listId}`,
          {
            tasksStatus: tasksStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
    } catch (error){
        console.log(error);
    }
}
export async function deleteList(listId: string, token: string){
     try {
       const response = await axios.delete(
         `${process.env.NEXT_PUBLIC_API_URL}/lists/${listId}`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
       return response;
     } catch (error) {
       console.log(error);
     }
}
export async function fetchRoutines(token: string) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/routines`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export async function postRoutine(newRoutine: RoutineType[], token: string) {
  console.log("Posting routine in fetchData function:", newRoutine);
    try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/routines`,
          newRoutine,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response) {
            throw new Error("Failed to create routine");
        }
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export async function deleteRoutine(routineId: string, token: string) {
  console.log("Deleting routine with ID:", routineId);
    try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/routines/${routineId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response) {
            throw new Error("Failed to delete routine");
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}
export async function updateRoutine(routineId: string, token: string, isCompletedToday: boolean) {
  try {
    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/routines/${routineId}`, {
      isCompletedToday: isCompletedToday
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
  } catch (error) {
    console.log("Error updating routines:", error);
  }
}