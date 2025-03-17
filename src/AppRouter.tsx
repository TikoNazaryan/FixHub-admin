import React, { useContext, useEffect, useState } from "react";
import {
  IonBadge,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route, useLocation } from "react-router";
import {
  peopleCircleOutline,
  caretUpCircle,
  timerOutline,
  checkmarkOutline,
  exitOutline,
} from "ionicons/icons";
import Login from "@pages/Login";
import Sellers from "@pages/Sellers";
import { StoreContext } from "@store/Store";
import Seller from "@pages/Seller";
import Offers from "@pages/Offers";
import "./index.css";
import ApprovedOfers from "@pages/ApprovedOfers";
import { STORAGE_KEY, useStorage } from "@hooks/useStorage";
import Request from "@pages/Request";

export const ROUTES = {
  LOGIN: "/login",
  SELLERS: "/sellers",
  SELLER: "/seller/:id",
  OFFERS: "/offers",
  APPROVED_OFFERS: "/approved-offers",
  REQUEST: "/requst/:id",
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
  const { isTokenSet, pendingOffers } = useContext(StoreContext);
  const { onRemoveStorage } = useStorage();
  const location = useLocation();
  const hideTabsOnRoutes = [ROUTES.LOGIN];

  useEffect(() => {
    (async () => {
      const isPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      document.documentElement.classList.toggle(
        "ion-palette-dark",
        isPrefersDark.matches
      );
    })();
  }, []);

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
          <ProtectedRoute path={ROUTES.SELLERS} exact component={Sellers} />
          <ProtectedRoute path={ROUTES.SELLER} exact component={Seller} />
          <ProtectedRoute path={ROUTES.OFFERS} exact component={Offers} />
          <ProtectedRoute path={ROUTES.REQUEST} exact component={Request} />
          <ProtectedRoute
            path={ROUTES.APPROVED_OFFERS}
            exact
            component={ApprovedOfers}
          />
          <Redirect exact from="/" to={ROUTES.SELLERS} />
        </IonRouterOutlet>

        {!hideTabsOnRoutes.includes(location.pathname) && (
          <IonTabBar slot="top">
            <IonTabButton tab="offers" href={ROUTES.OFFERS} layout="icon-start">
              <IonIcon icon={timerOutline} />
              <IonLabel>Սպասվող Առաջարկներ</IonLabel>
              {!!pendingOffers && <IonBadge>{pendingOffers.length}</IonBadge>}
            </IonTabButton>
            <IonTabButton
              tab="approved-offers"
              href={ROUTES.APPROVED_OFFERS}
              layout="icon-start"
            >
              <IonIcon icon={checkmarkOutline} />
              <IonLabel>Հաստատված Առաջարկներ</IonLabel>
            </IonTabButton>
            <IonTabButton
              tab="sellers"
              href={ROUTES.SELLERS}
              layout="icon-start"
            >
              <IonIcon icon={caretUpCircle} />
              <IonLabel>Վաճառողներ</IonLabel>
            </IonTabButton>
            <IonTabButton
              tab="logOut"
              layout="icon-start"
              className="log-out"
              onClick={() => {
                onRemoveStorage(STORAGE_KEY.TOKEN);
              }}
            >
              <IonIcon icon={exitOutline} />
              <IonLabel>Դուրս գալ</IonLabel>
            </IonTabButton>
          </IonTabBar>
        )}
      </IonTabs>
    </>
  );
};

export default AppRouter;
