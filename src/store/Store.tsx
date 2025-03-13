import api from "@api/api";
import { STORAGE_KEY, useStorage } from "@hooks/useStorage";
import React, { createContext, useState, ReactNode, useEffect } from "react";

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
  offers?: IOffer[];
  onSetOffers: (requests: IOffer[]) => void;
}

export const StoreContext = createContext<StoreContextType>({
  isTokenSet: undefined,
  onSetIsTokenSet: () => {},
  offers: undefined,
  onSetOffers: () => {},
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

  useEffect(() => {
    (async () => {
      const storageToken = await onGetStorage(STORAGE_KEY.TOKEN);
      api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      setIsTokenSet(!!storageToken);
    })();
  }, [onGetStorage]);

  /* -- All seller offers -- */
  const [offers, setOffers] = useState<StoreContextType["offers"]>();
  const onSetOffers: StoreContextType["onSetOffers"] = (offers) => {
    setOffers(offers);
  };

  return (
    <StoreContext.Provider
      value={{
        isTokenSet,
        onSetIsTokenSet,
        offers,
        onSetOffers,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
