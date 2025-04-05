
import axios from "axios";

export const groupData=async(endPoint: string) =>{
    const response = await axios.get(endPoint);
    return response.data;
}