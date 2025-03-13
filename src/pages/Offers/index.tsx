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
  IonIcon,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./index.css";
import Container from "@components/Container";
import { StoreContext } from "@store/Store";
import { getOffers } from "@api/offer";

const Offers: React.FC = () => {
  const [isOffersLoading, setIsOffersLoading] = useState(false);

  const { offers, onSetOffers } = useContext(StoreContext);

  const onApprove = () => {};

  const onReject = () => {};

  useEffect(() => {
    (async () => {
      if (!offers) {
        setIsOffersLoading(true);
        const { offers } = await getOffers();
        onSetOffers(offers);
        setIsOffersLoading(false);
      }
    })();
  }, [offers]);

  const isLoading = isOffersLoading;

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>Առաջարկներ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonLoading isOpen={isLoading} message="Loading..." spinner="circles" />
        <Container>
          {offers?.map((offer) => {
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
