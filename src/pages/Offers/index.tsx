import React, { useContext, useEffect, useState } from "react";
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonText,
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
        <IonAccordionGroup>
          {pendingOffers?.map((offer) => {
            return (
              <IonAccordion key={offer.id} value={`${offer.id}`}>
                <IonItem slot="header" color="light">
                  <IonLabel>
                    {" "}
                    {offer.part_number} ({offer.condition})
                  </IonLabel>
                </IonItem>
                <IonItem slot="content">
                  <IonLabel>{offer.price}</IonLabel>
                  <IonChip color="primary">{offer.status}</IonChip>

                  <IonButton
                    fill="clear"
                    onClick={() => onApprove()}
                    slot="end"
                  >
                    Հաստատել
                  </IonButton>
                  <IonButton
                    fill="clear"
                    color="danger"
                    slot="end"
                    onClick={() => onReject()}
                  >
                    Մերժել
                  </IonButton>
                </IonItem>
              </IonAccordion>
            );
          })}
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default Offers;
