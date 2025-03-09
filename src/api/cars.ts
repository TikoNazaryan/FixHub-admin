import api, { ApiResponse, ENDPOINTS } from "@api//api";

import { ICar } from "../store/Store";

export interface IGetTokenResponse {
  cars: ICar[];
}

export const getCars = async (): Promise<IGetTokenResponse> => {
  try {
    const response = await api.get<ApiResponse<IGetTokenResponse>>(
      ENDPOINTS.CARS
    );

    return { cars: response.data.body.cars };
  } catch (e) {
    console.error(e);
  }

  return { cars: [] };
};
