import React from "react";
import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import "./index.css";
import Container from "@components/Container";

import { ROUTES } from "../../AppRouter";

const Registration: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <Container>
          <IonText color={"dark"}>
            <h1 className="registration_header">Car Parts</h1>
          </IonText>

          <IonText color={"dark"}>
            <div className="ion-padding-horizontal">
              <h2>Գրանցման համար</h2>
              <p>Քայլ 1: Գնացեք այս հասցեով &quot;Հյուսիսային պողոտա 1&quot;</p>
              <p>Քայլ 2: ...</p>
            </div>
          </IonText>

          <div className="ion-padding-horizontal">
            <IonButton fill="outline" color={"dark"} routerLink={ROUTES.LOGIN}>
              Վերադառնալ
            </IonButton>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Registration;
