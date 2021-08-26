import http from "./httpService";
import { apiUrl } from "../config.json";
const aiEndpoint = apiUrl + "/genres";
export function getGenres() {
  return http.get(aiEndpoint);
}
