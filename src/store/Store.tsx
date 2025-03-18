import api from "@api/api";
import { getRequsts } from "@api/requests";
import { STORAGE_KEY, useStorage } from "@hooks/useStorage";
import React, { createContext, useState, ReactNode, useEffect } from "react";
export enum Status {
  pending = "pending",
  approved = "approved",
}
export interface ISeller {
  id: number;
  name: string;
  address: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface ICarModel {
  id: number;
  name: string;
  address: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface IOffer {
  id: number;
  request_id: number;
  user_id: number;
  price: string;
  part_number: string;
  condition: string;
  status: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  images: IImage[];
}
export interface IImage {
  id: number;
  request_id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
}
export interface IRequest {
  id: number;
  brand_id: number;
  model_id: number;
  user_id: number;
  user_phone: string;
  user_hash: string;
  vin: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  description: string;
  status: Status;
  brand: ICar;
  model: ICarModel;
  user: ISeller;
  offers: IOffer[];
  images: IImage[];
}
export interface ICar {
  id: number;
  name: string;
  models: ICarModel[];
}

export interface StoreContextType {
  isTokenSet?: boolean;
  onSetIsTokenSet: (token?: boolean) => void;
  pendingRequests?: IRequest[];
  approvedRequests?: IRequest[];
  onSetPendingRequests: (requests: IRequest[]) => void;
  onSetApprovedRequests: (requests: IRequest[]) => void;
}

export const StoreContext = createContext<StoreContextType>({
  isTokenSet: undefined,
  onSetIsTokenSet: () => {},
  pendingRequests: undefined,
  approvedRequests: undefined,
  onSetPendingRequests: () => {},
  onSetApprovedRequests: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { onGetStorage } = useStorage();

  /* -- Token -- */
  const [isTokenSet, setIsTokenSet] = useState<boolean>();
  const onSetIsTokenSet: StoreContextType["onSetIsTokenSet"] = (token) => {
    setIsTokenSet(token);
  };
  /* -- All seller Requests -- */
  const [pendingRequests, setPendingRequests] =
    useState<StoreContextType["pendingRequests"]>();
  const [approvedRequests, setApprovedRequests] =
    useState<StoreContextType["approvedRequests"]>();
  const onSetPendingRequests: StoreContextType["onSetPendingRequests"] = (
    requests
  ) => {
    console.log(requests);

    setPendingRequests(requests);
  };
  const onSetApprovedRequests: StoreContextType["onSetApprovedRequests"] = (
    requests
  ) => {
    setApprovedRequests(requests);
  };

  useEffect(() => {
    (async () => {
      const storageToken = await onGetStorage(STORAGE_KEY.TOKEN);
      api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      setIsTokenSet(!!storageToken);
      if (!!storageToken) {
        const { requests } = await getRequsts();
        setPendingRequests(
          requests
            ?.filter((item) => item.status === Status.pending)
            .sort(
              (a, b) =>
                new Date(b.created_at).getDate() -
                new Date(a.created_at).getDate()
            )
        );
        setApprovedRequests(
          requests
            ?.filter((item) => item.status === Status.approved)
            .sort(
              (a, b) =>
                new Date(b.created_at).getDate() -
                new Date(a.created_at).getDate()
            )
        );
      }
    })();
  }, [onGetStorage]);

  return (
    <StoreContext.Provider
      value={{
        isTokenSet,
        onSetIsTokenSet,
        pendingRequests,
        approvedRequests,
        onSetPendingRequests,
        onSetApprovedRequests,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
