import api from "@api/api";
import { getOffers } from "@api/offer";
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
}

export interface ICar {
  id: number;
  name: string;
  models: ICarModel[];
}

export interface StoreContextType {
  isTokenSet?: boolean;
  onSetIsTokenSet: (token?: boolean) => void;
  pendingOffers?: IOffer[];
  approvedOffers?: IOffer[];
  onSetPendingOffers: (requests: IOffer[]) => void;
  onSetApprovedOffers: (requests: IOffer[]) => void;
}

export const StoreContext = createContext<StoreContextType>({
  isTokenSet: undefined,
  onSetIsTokenSet: () => {},
  pendingOffers: undefined,
  approvedOffers: undefined,
  onSetPendingOffers: () => {},
  onSetApprovedOffers: () => {},
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
  /* -- All seller offers -- */
  const [pendingOffers, setPendingOffers] =
    useState<StoreContextType["pendingOffers"]>();
  const [approvedOffers, setApprovedOffers] =
    useState<StoreContextType["approvedOffers"]>();
  const onSetPendingOffers: StoreContextType["onSetPendingOffers"] = (
    offers
  ) => {
    setPendingOffers(offers);
  };
  const onSetApprovedOffers: StoreContextType["onSetApprovedOffers"] = (
    offers
  ) => {
    setApprovedOffers(offers);
  };

  useEffect(() => {
    (async () => {
      const storageToken = await onGetStorage(STORAGE_KEY.TOKEN);
      api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      setIsTokenSet(!!storageToken);
      if (!!storageToken) {
        const { offers } = await getOffers();
        onSetPendingOffers(
          offers
            ?.filter((item) => item.status === Status.pending)
            .sort(
              (a, b) =>
                new Date(b.created_at).getDate() -
                new Date(a.created_at).getDate()
            )
        );
        onSetApprovedOffers(
          offers
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
        pendingOffers,
        approvedOffers,
        onSetPendingOffers,
        onSetApprovedOffers,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
