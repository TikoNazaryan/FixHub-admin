import React, { useContext, useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./index.css";
import Container from "@components/Container";
import { StoreContext } from "@store/Store";

const Offers: React.FC = () => {
  const { pendingOffers, onSetPendingOffers } = useContext(StoreContext);

  const onApprove = () => {};

  const onReject = () => {};

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>Առաջարկներ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonLoading
          isOpen={!pendingOffers}
          message="Loading..."
          spinner="circles"
        />
        <Container>
          {pendingOffers?.map((offer) => {
            return (
              <IonCard key={offer.id}>
                <IonCardHeader>
                  <IonCardTitle>
                    {offer.part_number} ({offer.condition})
                  </IonCardTitle>
                  <IonCardSubtitle>{offer.price}</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonChip color="primary">{offer.status}</IonChip>
                </IonCardContent>
                <IonButton fill="clear" onClick={() => onApprove()}>
                  Հաստատել
                </IonButton>
                <IonButton
                  fill="clear"
                  color="danger"
                  onClick={() => onReject()}
                >
                  Մերժել
                </IonButton>
              </IonCard>
            );
          })}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Offers;
