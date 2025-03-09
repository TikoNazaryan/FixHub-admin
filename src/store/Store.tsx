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

export interface ICar {
  id: number;
  name: string;
  models: ICarModel[];
}

export interface StoreContextType {
  isTokenSet?: boolean;
  onSetIsTokenSet: (token?: boolean) => void;
  darkMode: boolean;
  onSetDarkMode: (mode: boolean) => void;
  cars?: ICar[];
  onSetCars: (cars: ICar[]) => void;
  seller?: ISeller;
  onSetSeller: (seller: ISeller) => void;
  sellerCars?: ICar[];
  onSetSellerCars: (cars: ICar[]) => void;
}

export const StoreContext = createContext<StoreContextType>({
  isTokenSet: undefined,
  onSetIsTokenSet: () => {},
  darkMode: false,
  onSetDarkMode: () => {},
  cars: undefined,
  onSetCars: () => {},
  seller: undefined,
  onSetSeller: () => {},
  sellerCars: undefined,
  onSetSellerCars: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { onGetStorage, onSetStorage } = useStorage();

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

  /* -- Dark Mode -- */
  const [darkMode, setDarkMode] = useState<StoreContextType["darkMode"]>(false);
  const onSetDarkMode: StoreContextType["onSetDarkMode"] = (mode) => {
    document.documentElement.classList.toggle("ion-palette-dark", mode);
    onSetStorage(STORAGE_KEY.IS_DARK, mode ? "true" : "false");
    setDarkMode(mode);
  };

  useEffect(() => {
    (async () => {
      const isStorageDark = await onGetStorage(STORAGE_KEY.IS_DARK);
      if (isStorageDark === null) {
        const isPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        onSetStorage(
          STORAGE_KEY.IS_DARK,
          isPrefersDark.matches ? "true" : "false"
        );
        onSetDarkMode(isPrefersDark.matches);
      } else {
        onSetDarkMode(isStorageDark === "true");
      }
    })();
  }, []);

  /* -- All car models -- */
  const [cars, setCars] = useState<StoreContextType["cars"]>();
  const onSetCars: StoreContextType["onSetCars"] = (cars) => {
    setCars(cars);
  };

  /* -- Seller car models -- */
  const [sellerCars, setSellerCars] =
    useState<StoreContextType["sellerCars"]>();
  const onSetSellerCars: StoreContextType["onSetSellerCars"] = (cars) => {
    setSellerCars(cars);
  };

  /* -- Seller car models -- */
  const [seller, setSeller] = useState<StoreContextType["seller"]>();
  const onSetSeller: StoreContextType["onSetSeller"] = (seller) => {
    setSeller(seller);
  };

  return (
    <StoreContext.Provider
      value={{
        isTokenSet,
        onSetIsTokenSet,
        darkMode,
        onSetDarkMode,
        cars,
        onSetCars,
        seller,
        onSetSeller,
        sellerCars,
        onSetSellerCars,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
