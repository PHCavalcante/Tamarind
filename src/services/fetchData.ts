import axios from "axios";
import taskTypes
 from "@/types/taskTypes";

export async function fetchData(userId: string){
    try{
        const response = await axios.get(`http://localhost:3000/tasks/${userId}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function postTask(newTask: taskTypes){
    try{
        const response = await axios.post("http://localhost:3000/tasks", newTask);
        console.log(response);
        return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function updateTask(task : taskTypes){
    try{
        const response = await axios.put(`http://localhost:3000/tasks/${task._id}`,
            {
                "title": task.title,
                "description": task.description,
                "scheduleDate": task.scheduleDate
            });
            console.log(response);
            return response.data;
    } catch (error){
        console.error(error);
    }
}
export async function deleteTask(taskId : string){
    try{
        const response = await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        return response;
    } catch (error){
        console.error(error);
    }
}
