import api, { ApiResponse, ENDPOINTS } from "@api//api";
import { ISeller } from "@store/Store";

export interface IGetSellerPayolad {
  id: string;
}

export interface IGetSellerResponse {
  user: ISeller | undefined;
}
export interface IGetAllSellersResponse {
  sellers: ISeller[];
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
export const getAllSellers = async (): Promise<IGetAllSellersResponse> => {
  try {
    const response = await api.get<ApiResponse<IGetAllSellersResponse>>(
      ENDPOINTS.SELLERS
    );

    return { sellers: response.data.body.sellers };
  } catch (e) {
    console.error(e);
  }

  return { sellers: [] };
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

export const createSeller = async (
  payload: Omit<IUpdateSellerPayolad, "id"> & { password: string }
): Promise<IUpdateSellerResponse> => {
  try {
    await api.post<ApiResponse<IUpdateSellerResponse>>(
      ENDPOINTS.SELLER.replace("/:id", ""),
      {
        name: payload.name,
        address: payload.address,
        phone: payload.phone,
        role: "seller",
        password: payload.password,
      }
    );

    return { status: "updated" };
  } catch (e) {
    console.error(e);
  }

  return { status: "" };
};
