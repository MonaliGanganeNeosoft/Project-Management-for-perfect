import axios from "axios";
import { MAIN_URL } from "./Url";
export function addNewProjectService(data){
    return axios.post(`${MAIN_URL}project/addNewProjectFunction`,data)
}
export function fetchprojectServiceAll(){
    return axios.get(`${MAIN_URL}project/fetchAllprojectService`)
}