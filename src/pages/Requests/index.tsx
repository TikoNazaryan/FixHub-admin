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
  IonImg,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./index.css";
import { StoreContext } from "@store/Store";
import { approveRequest, rejectRequest } from "@api/requests";
import { checkmarkCircleOutline } from "ionicons/icons";
import { API_BASE_URL } from "@api/api";

const Requests: React.FC = () => {
  const { pendingRequests } = useContext(StoreContext);
  const [isRequetsApproved, setIsRequetsApproved] = useState(false);
  const [isRequetsReject, setIsRequetsReject] = useState(false);
  const onApprove = async (id: number) => {
    try {
      const reponse = await approveRequest({ id });
      if (reponse) {
        setIsRequetsApproved(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onReject = async (id: number) => {
    try {
      const reponse = await rejectRequest({ id });
      if (reponse) {
        setIsRequetsReject(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>Առաջարկներ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonLoading
          isOpen={!pendingRequests}
          message="Loading..."
          spinner="circles"
        />
        <IonAccordionGroup>
          {pendingRequests?.map((request) => {
            return (
              <IonAccordion key={request.id} value={`${request.id}`}>
                <IonItem slot="header" color="light">
                  <IonLabel>
                    {" "}
                    {request.brand.name} ({request.model?.name})
                  </IonLabel>
                </IonItem>
                <IonCard slot="content">
                  <IonCardHeader>
                    <IonCardTitle>{request.vin}</IonCardTitle>
                    <IonCardSubtitle>{request.description}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem className="content-item">
                      {request.images.map((item) => (
                        <IonImg
                          key={item.image_path}
                          src={API_BASE_URL + "/" + item.image_path}
                          alt="Image"
                        ></IonImg>
                      ))}
                    </IonItem>
                    <IonItem className="content-item">
                      <IonChip color="primary" slot="end">
                        {request.status}
                      </IonChip>

                      <IonButton
                        fill="clear"
                        onClick={() => onApprove(request.id)}
                        slot="end"
                      >
                        Հաստատել
                      </IonButton>
                      <IonButton
                        fill="clear"
                        color="danger"
                        slot="end"
                        onClick={() => onReject(request.id)}
                      >
                        Մերժել
                      </IonButton>
                    </IonItem>
                  </IonCardContent>
                </IonCard>
              </IonAccordion>
            );
          })}
        </IonAccordionGroup>
      </IonContent>
      <IonToast
        isOpen={!!isRequetsApproved}
        message={"Առաջարկը հաստատվել է"}
        onDidDismiss={() => setIsRequetsApproved(false)}
        duration={5000}
        color={"success"}
        swipeGesture="vertical"
        icon={checkmarkCircleOutline}
        position="top"
        positionAnchor="header"
        buttons={[
          {
            text: "Լավ",
            role: "cancel",
          },
        ]}
      ></IonToast>
      <IonToast
        isOpen={!!isRequetsReject}
        message={"Առաջարկը մերժվել է"}
        onDidDismiss={() => setIsRequetsReject(false)}
        duration={5000}
        color={"danger"}
        swipeGesture="vertical"
        icon={checkmarkCircleOutline}
        position="top"
        positionAnchor="header"
        buttons={[
          {
            text: "Լավ",
            role: "cancel",
          },
        ]}
      ></IonToast>
    </IonPage>
  );
};

export default Requests;
