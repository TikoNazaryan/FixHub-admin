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
import { IOffer, Status, StoreContext } from "@store/Store";
import { useParams } from "react-router";
import { requests } from "@pages/ApprovedOfers";

const Request: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [request, setRequest] = useState<IOffer[]>([]);
  const onApprove = () => {};

  const onReject = () => {};
  useEffect(() => {
    setRequest(
      requests.find((item) => item.id === +id)?.offers as unknown as IOffer[]
    );
  }, [id]);

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>Առաջարկներ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonLoading isOpen={!request} message="Loading..." spinner="circles" />
        <Container>
          {request
            ?.filter((item) => item.status === Status.pending)
            .map((offer) => {
              return (
                <IonCard key={offer.id}>
                  <IonCardHeader>
                    <IonCardTitle>
                      {" "}
                      {offer.part_number} ({offer.condition})
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
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
                  </IonCardContent>{" "}
                </IonCard>
              );
            })}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Request;
