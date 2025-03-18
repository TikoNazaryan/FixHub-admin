import { Preferences } from "@capacitor/preferences";
import { STORAGE_KEY, useStorage } from "@hooks/useStorage";
import axios, { AxiosError } from "axios";

export const API_BASE_URL =
  "https://hotpink-alpaca-496694.hostingersite.com/fixhub/api";

export type ApiResponse<T> = {
  status: number;
  error: null | unknown;
  body: T;
};

export const ENDPOINTS = {
  REFRESH_TOKEN: "/auth/refresh-token",
  TOKEN: "/auth/token",
  SELLERS: "/admin/seller",
  SELLER: "/admin/seller/:id",
  REQUESTS: "/requests",
  APPROVE_REQUEST: "/admin/request/:id/approve",
  REJEECT_REQUEST: "/admin/request:id/reject",
  APPROVE_OFFER: "/admin/offer/:id/approve",
  REJEECT_OFFER: "/admin/offer:id/reject",
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
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const { value } = await Preferences.get({
        key: STORAGE_KEY.TOKEN,
      });

      try {
        const data = await axios.post(
          API_BASE_URL + ENDPOINTS.REFRESH_TOKEN,
          null,
          {
            headers: {
              Authorization: `Bearer ` + value,
            },
          }
        );
        if (data) {
          await Preferences.set({
            key: STORAGE_KEY.TOKEN,
            value: data.data.body.accessToken,
          });
          originalRequest.headers["Authorization"] =
            `Bearer ${data.data.body.accessToken}`;
        }
        return api(originalRequest);
      } catch (err) {
        const error = err as AxiosError;
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          (async () => {
            await Preferences.remove({ key: STORAGE_KEY.TOKEN });
            window.location.reload();
          })();
        }
      }
    }
    return Promise.reject(error); // Reject the error
  }
);

export default api;
