import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/user";

export function register(user) {
  return http.post(`${apiEndpoint}/register`, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
