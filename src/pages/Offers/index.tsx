import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./index.css";
import Container from "@components/Container";

const Offers: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <Container>Offers</Container>
      </IonContent>
    </IonPage>
  );
};

export default Offers;
