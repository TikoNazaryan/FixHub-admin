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
  IonImg,
  IonItem,
  IonLoading,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./index.css";
import Container from "@components/Container";
import { IOffer, Status, StoreContext } from "@store/Store";
import { useParams } from "react-router";
import { API_BASE_URL } from "@api/api";
import { approveOffer, rejectOffer } from "@api/requests";
import { checkmarkCircleOutline } from "ionicons/icons";

const Request: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [request, setRequest] = useState<IOffer[]>([]);
  const [isRequetsApproved, setIsRequetsApproved] = useState(false);
  const [isRequetsReject, setIsRequetsReject] = useState(false);
  const { approvedRequests } = useContext(StoreContext);

  const onApprove = async (id: number) => {
    try {
      const reponse = await approveOffer({ id });
      if (reponse) {
        setIsRequetsApproved(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onReject = async (id: number) => {
    try {
      const reponse = await rejectOffer({ id });
      if (reponse) {
        setIsRequetsReject(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setRequest(
      approvedRequests?.find((item) => item.id === +id)
        ?.offers as unknown as IOffer[]
    );
  }, [id, approvedRequests]);

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
                <IonCard key={offer.id} className="card">
                  <IonCardHeader>
                    <IonCardTitle>
                      {" "}
                      {offer.part_number} ({offer.condition})
                    </IonCardTitle>
                    <IonCardSubtitle>{offer.price}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem className="content-item">
                      {offer.images.map((item) => (
                        <IonImg
                          key={item.image_path}
                          src={API_BASE_URL + "/" + item.image_path}
                          alt="Image"
                        ></IonImg>
                      ))}
                    </IonItem>
                    <IonItem className="content-item">
                      <IonChip color="primary" slot="end">
                        {offer.status}
                      </IonChip>

                      <IonButton
                        fill="clear"
                        onClick={() => onApprove(offer.id)}
                        slot="end"
                      >
                        Հաստատել
                      </IonButton>
                      <IonButton
                        fill="clear"
                        color="danger"
                        slot="end"
                        onClick={() => onReject(offer.id)}
                      >
                        Մերժել
                      </IonButton>
                    </IonItem>
                  </IonCardContent>{" "}
                </IonCard>
              );
            })}
        </Container>
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

export default Request;
