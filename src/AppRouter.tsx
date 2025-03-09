import React, { useContext, useState } from "react";
import {
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route, useLocation } from "react-router";
import { personCircle, caretDownCircle, caretUpCircle } from "ionicons/icons";
import { useEffect } from "react";
import Login from "@pages/Login";
import Registration from "@pages/Registration";
import Cars from "@pages/Cars";
import Account from "@pages/Account";
import Offers from "@pages/Offers";
import Requests from "@pages/Requests";
import { STORAGE_KEY, useStorage } from "@hooks/useStorage";
import { StoreContext } from "@store/Store";

export const ROUTES = {
  LOGIN: "/login",
  REGISTRATION: "/registration",
  REQUESTS: "/requests",
  OFFERS: "/offers",
  ACCOUNT: "/account",
  CARS: "/cars",
};

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  [key: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isTokenSet } = useContext(StoreContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isTokenSet ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />
      }
    />
  );
};

const AppRouter: React.FC = () => {
  const { isTokenSet } = useContext(StoreContext);
  const location = useLocation();
  const hideTabsOnRoutes = [ROUTES.LOGIN, ROUTES.REGISTRATION];

  if (isTokenSet === undefined) {
    return (
      <IonLoading isOpen={isTokenSet} message="Loading..." spinner="circles" />
    );
  }

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route path={ROUTES.LOGIN} exact component={Login} />
          <Route path={ROUTES.REGISTRATION} exact component={Registration} />
          <ProtectedRoute path={ROUTES.REQUESTS} exact component={Requests} />
          <ProtectedRoute path={ROUTES.OFFERS} exact component={Offers} />
          <ProtectedRoute path={ROUTES.ACCOUNT} exact component={Account} />
          <ProtectedRoute path={ROUTES.CARS} exact component={Cars} />
          <Redirect exact from="/" to={ROUTES.REQUESTS} />
        </IonRouterOutlet>

        {!hideTabsOnRoutes.includes(location.pathname) && (
          <IonTabBar slot="bottom">
            <IonTabButton tab="requests" href={ROUTES.REQUESTS}>
              <IonIcon icon={caretDownCircle} />
              <IonLabel>Հայց</IonLabel>
            </IonTabButton>

            <IonTabButton tab="offers" href={ROUTES.OFFERS}>
              <IonIcon icon={caretUpCircle} />
              <IonLabel>Առաջարկներ</IonLabel>
            </IonTabButton>

            <IonTabButton tab="account" href={ROUTES.ACCOUNT}>
              <IonIcon icon={personCircle} />
              <IonLabel>Հաշիվ</IonLabel>
            </IonTabButton>
          </IonTabBar>
        )}
      </IonTabs>
    </>
  );
};

export default AppRouter;
