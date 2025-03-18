import api, { ApiResponse, ENDPOINTS } from "@api//api";
import { IOffer, IRequest } from "@store/Store";

// export interface ICreateOfferPayload {
//   id: number;
//   price: number;
//   part_number: string;
//   condition: string;
// }

// export interface ICreateOfferResponse {
//   offer: IOffer;
// }

export interface IGetRequestResponse {
  requests: IRequest[];
}

export const getRequsts = async (): Promise<IGetRequestResponse> => {
  try {
    const response = await api.get<ApiResponse<IGetRequestResponse>>(
      ENDPOINTS.REQUESTS
    );

    return { requests: response.data.body.requests };
  } catch (e) {
    console.error(e);
  }

  return { requests: [] };
};

export const approveRequest = async (payload: { id: number }) => {
  try {
    await api.post(ENDPOINTS.APPROVE_REQUEST.replace(":id", `${payload.id}`));

    return { status: "updated" };
  } catch (e) {
    console.error(e);
  }

  return { status: "" };
};
export const rejectRequest = async (payload: { id: number }) => {
  try {
    await api.post(ENDPOINTS.APPROVE_REQUEST.replace(":id", `${payload.id}`));

    return { status: "updated" };
  } catch (e) {
    console.error(e);
  }

  return { status: "" };
};

export const approveOffer = async (payload: { id: number }) => {
  try {
    await api.post(ENDPOINTS.APPROVE_OFFER.replace(":id", `${payload.id}`));

    return { status: "updated" };
  } catch (e) {
    console.error(e);
  }

  return { status: "" };
};
export const rejectOffer = async (payload: { id: number }) => {
  try {
    await api.post(ENDPOINTS.APPROVE_OFFER.replace(":id", `${payload.id}`));

    return { status: "updated" };
  } catch (e) {
    console.error(e);
  }

  return { status: "" };
};
