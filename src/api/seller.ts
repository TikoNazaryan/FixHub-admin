import api, { ApiResponse, ENDPOINTS } from "@api//api";

import { ICar, ISeller } from "../store/Store";

export interface IGetSellerResponse {
  user: ISeller;
}

export interface IGetSellerCarsResponse {
  cars: ICar[];
}

export interface IUpdateSellerCarsPayload {
  model_ids: number[];
}

export interface IUpdateSellerCarsResponse {
  status: string;
}

export const getSeller = async (): Promise<IGetSellerResponse> => {
  try {
    const response = await api.get<ApiResponse<IGetSellerResponse>>(
      ENDPOINTS.SELLER
    );

    return { user: response.data.body.user };
  } catch (e) {
    console.error(e);
  }

  return {
    user: {
      id: 0,
      name: "",
      address: "",
      phone: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    },
  };
};

export const getSellerCars = async (): Promise<IGetSellerCarsResponse> => {
  try {
    const response = await api.get<ApiResponse<IGetSellerCarsResponse>>(
      ENDPOINTS.SELLER_CARS
    );

    return { cars: response.data.body.cars };
  } catch (e) {
    console.error(e);
  }

  return { cars: [] };
};

export const updateSellerCars = async (
  payload: IUpdateSellerCarsPayload
): Promise<IUpdateSellerCarsResponse> => {
  try {
    await api.post<ApiResponse<IUpdateSellerCarsResponse>>(
      ENDPOINTS.SELLER_CARS,
      { model_ids: payload.model_ids }
    );

    return { status: "updated" };
  } catch (e) {
    console.error(e);
  }

  return { status: "" };
};
