import axios, { AxiosInstance } from "axios";
import getToken from "./TokenManager";

let axiosInstance: AxiosInstance;

const getAxios = () => {
  if (!axiosInstance) {
    buildAxios();
  }
  return axiosInstance;
};

export const buildAxios = () => {
  axiosInstance = undefined;
  axiosInstance = axios.create({
    baseURL: "/api/",
    headers: {
      authorization: getToken(),
    },
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      const message = err.response.data?.error;
      if (message === "Not logged in.") {
        window.location.href = "/login";
        return;
      } else if (message === "Invalid token.") {
        window.location.href = "/login";
        return;
      }

      throw err;
    }
  );
};

export default getAxios;
