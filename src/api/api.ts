import { Preferences } from "@capacitor/preferences";
import { STORAGE_KEY } from "@hooks/useStorage";
import axios from "axios";

const API_BASE_URL =
  "https://hotpink-alpaca-496694.hostingersite.com/fixhub/api/";

export type ApiResponse<T> = {
  status: number;
  error: null | unknown;
  body: T;
};

export const ENDPOINTS = {
  TOKEN: "/auth/token",
  SELLER: "/seller",
  SELLER_CARS: "/seller/cars",
  CARS: "/cars",
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      (async () => {
        await Preferences.remove({ key: STORAGE_KEY.TOKEN });
        window.location.reload();
      })();
    }
    return Promise.reject(error); // Reject the error
  }
);

export default api;
