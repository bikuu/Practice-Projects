import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
axios.interceptors.response.use(null, (error) => {
  const exppectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!exppectedError) {
    logger.log(error);
    toast.error("An unexpected error occured");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  setJwt,
};
