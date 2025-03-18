import api, { ApiResponse, ENDPOINTS } from "@api//api";

export interface IGetTokenPayolad {
  phone: string;
  password: string;
}

export interface IGetTokenResponse {
  token: string | null;
}

export const getToken = async (
  payload: IGetTokenPayolad
): Promise<IGetTokenResponse> => {
  try {
    const response = await api.post<ApiResponse<IGetTokenResponse>>(
      ENDPOINTS.TOKEN,
      {
        phone: payload.phone,
        password: payload.password,
      }
    );

    return {
      token: response.data.body.token,
    };
  } catch (e) {
    console.error(e);
  }

  return { token: null };
};
