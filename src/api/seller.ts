import api, { ApiResponse, ENDPOINTS } from "@api//api";
import { ISeller } from "@store/Store";

export interface IGetSellerPayolad {
  id: string;
}

export interface IGetSellerResponse {
  user: ISeller | undefined;
}

export interface IUpdateSellerPayolad {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface IUpdateSellerResponse {
  status: string;
}

export const getSeller = async (
  payload: IGetSellerPayolad
): Promise<IGetSellerResponse> => {
  try {
    const response = await api.get<ApiResponse<IGetSellerResponse>>(
      ENDPOINTS.SELLER.replace(":id", payload.id)
    );

    return { user: response.data.body.user };
  } catch (e) {
    console.error(e);
  }

  return { user: undefined };
};

export const updateSeller = async (
  payload: IUpdateSellerPayolad
): Promise<IUpdateSellerResponse> => {
  try {
    await api.put<ApiResponse<IUpdateSellerResponse>>(
      ENDPOINTS.SELLER.replace(":id", payload.id),
      {
        name: payload.name,
        address: payload.address,
        phone: payload.phone,
      }
    );

    return { status: "updated" };
  } catch (e) {
    console.error(e);
  }

  return { status: "" };
};
