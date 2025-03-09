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
  IonCheckbox,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { copy } from "ionicons/icons";
import Container from "@components/Container";
import "./index.css";
import { StoreContext } from "@store/Store";
import { getSellerCars } from "@api/seller";

const Requests: React.FC = () => {
  const [isSellerCarsLoading, setIsSellerAllCarsLoading] = useState(false);

  const { sellerCars, onSetSellerCars } = useContext(StoreContext);

  useEffect(() => {
    (async () => {
      if (!sellerCars) {
        setIsSellerAllCarsLoading(true);
        const { cars } = await getSellerCars();
        onSetSellerCars(cars);
        setIsSellerAllCarsLoading(false);
      }
    })();
  }, [sellerCars]);

  const isLoading = isSellerCarsLoading;

  return (
    <IonPage className="requests">
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>Հարցումներ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonLoading isOpen={isLoading} message="Loading..." spinner="circles" />
        <Container>
          <IonAccordionGroup expand="inset">
            <IonAccordion value="top">
              <IonItem slot="header" color="light">
                <IonLabel>Ֆիլտրել ըստ մեքենայի</IonLabel>
              </IonItem>
              <div slot="content">
                {sellerCars?.map((car) => {
                  return (
                    <IonAccordionGroup key={car.id}>
                      <IonAccordion value={car.name}>
                        <IonItem slot="header" color="light">
                          <IonLabel>{car.name}</IonLabel>
                        </IonItem>
                        <div slot="content">
                          <IonList>
                            {car.models.map((model) => {
                              return (
                                <IonItem key={model.id}>
                                  <IonCheckbox labelPlacement="fixed">
                                    {model.name}
                                  </IonCheckbox>
                                </IonItem>
                              );
                            })}
                          </IonList>
                        </div>
                      </IonAccordion>
                    </IonAccordionGroup>
                  );
                })}
              </div>
            </IonAccordion>
          </IonAccordionGroup>
          <IonCard>
            <IonCardContent>
              <IonInput
                label="Stacked label"
                labelPlacement="floating"
              ></IonInput>
            </IonCardContent>
            <IonButton fill="clear">Առաջարկել</IonButton>
            <IonButton fill="clear" color="danger">
              Չեղարկել
            </IonButton>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Opel / Vectra</IonCardTitle>
              <IonCardSubtitle>
                4Y1SL65848Z41143919
                <IonButton size="small" fill="outline" color={"dark"}>
                  <IonIcon slot="icon-only" icon={copy}></IonIcon>
                </IonButton>
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              Dzax razvali tulki
              <div className="requests-card-chips">
                <IonChip color="primary">Սպասում է</IonChip>
                <IonChip color="dark">0 Առաջարկ</IonChip>
              </div>
            </IonCardContent>
            <IonButton fill="clear">Պատասխանել</IonButton>
            <IonButton fill="clear" color="danger">
              Մերժել
            </IonButton>
          </IonCard>
          <IonCard>
            <IonCardContent>
              <IonText color="dark">
                <h1>Վստահ եք, որ ցանկանում եք մերժել առաջարկը</h1>
              </IonText>
            </IonCardContent>
            <IonButton fill="clear">Չեղարկել</IonButton>
            <IonButton fill="clear" color="danger">
              Մերժել
            </IonButton>
          </IonCard>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Requests;
