import api, { ApiResponse, ENDPOINTS } from "@api//api";
import { IOffer } from "@store/Store";

export interface ICreateOfferPayload {
  id: number;
  price: number;
  part_number: string;
  condition: string;
}

export interface ICreateOfferResponse {
  offer: IOffer;
}

export interface IGetRequestResponse {
  offers: IOffer[];
}

export const getOffers = async (): Promise<IGetRequestResponse> => {
  try {
    const response = await api.get<ApiResponse<IGetRequestResponse>>(
      ENDPOINTS.OFFER
    );

    return { offers: response.data.body.offers };
  } catch (e) {
    console.error(e);
  }

  return { offers: [] };
};
