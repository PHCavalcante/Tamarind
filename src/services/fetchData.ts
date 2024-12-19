import axios from "axios";

export async function fetchData(){
    try{
        const response = await axios.get("http://localhost:3000/tasks");
        return response.data;
    } catch(error){
        console.error(error);
    }
}
