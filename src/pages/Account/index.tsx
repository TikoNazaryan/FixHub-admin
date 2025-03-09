import React, { useEffect, useState } from "react";
import {
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonPage,
  IonText,
  IonToggle,
} from "@ionic/react";
import "./index.css";
import { useContext } from "react";
import Container from "@components/Container";
import example_logo from "@assets/example_logo.jpg";
import { StoreContext } from "@store/Store";

import { ROUTES } from "../../AppRouter";
import { getSeller } from "@api/seller";
import { Preferences } from "@capacitor/preferences";
import { STORAGE_KEY, useStorage } from "@hooks/useStorage";

const Account: React.FC = () => {
  const [isSellerLoading, setIsSellerLoading] = useState(false);
  const { onRemoveStorage } = useStorage();

  const { darkMode, onSetDarkMode, seller, onSetSeller } =
    useContext(StoreContext);

  const onDarkModeChange = (e: CustomEvent) => {
    onSetDarkMode(e.detail.checked);
  };

  const onLogOut = async () => {
    await onRemoveStorage(STORAGE_KEY.TOKEN);
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      if (!seller) {
        setIsSellerLoading(true);
        const { user } = await getSeller();
        onSetSeller(user);
        setIsSellerLoading(false);
      }
    })();
  }, [seller]);

  const isLoading = isSellerLoading;

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonLoading isOpen={isLoading} message="Loading..." spinner="circles" />
        <Container>
          <div className="account-header">
            {/* <IonAvatar className="account-header-avatar">
              <img alt="Silhouette of a person's head" src={example_logo} />
            </IonAvatar> */}
            <IonText color={"dark"} className="account-header-name">
              <h1>{seller?.name}</h1>
            </IonText>
          </div>
          <IonListHeader>
            <IonLabel>Անձնական Տվյալներ</IonLabel>
          </IonListHeader>
          <IonList inset={true}>
            <IonItem>
              <IonLabel>Հեռ.</IonLabel>
              <IonText slot="end" color="medium">
                {seller?.phone}
              </IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Հասցե</IonLabel>
              <IonText slot="end" color="medium">
                {seller?.address}
              </IonText>
            </IonItem>
          </IonList>
          <IonListHeader>
            <IonLabel>Կարգավորումներ</IonLabel>
          </IonListHeader>
          <IonList inset={true}>
            <IonItem button={true} routerLink={ROUTES.CARS}>
              <IonLabel>Մեքենաներ</IonLabel>
            </IonItem>
            <IonItem>
              <IonToggle
                justify="space-between"
                checked={darkMode}
                onIonChange={onDarkModeChange}
              >
                Մութ ռեժիմ
              </IonToggle>
            </IonItem>
            <IonItem>
              <IonLabel color={"danger"} onClick={onLogOut}>
                Դուրս գալ
              </IonLabel>
            </IonItem>
          </IonList>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Account;
