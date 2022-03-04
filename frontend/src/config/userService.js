import axios from "axios";
import { MAIN_URL } from "./Url";

export function registerService(data){
    return axios.post(`${MAIN_URL}registerService`,data)
}
