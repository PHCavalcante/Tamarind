import axios from "axios";
import taskTypes
 from "@/types/taskTypes";
export async function fetchData(){
    try{
        const response = await axios.get("http://localhost:3000/tasks");
        return response.data;
    } catch(error){
        console.error(error);
    }
}

export async function updateTask(task : taskTypes){
    try{
        const response = await axios.put(`http://localhost:3000/tasks/${task.id}`,
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
