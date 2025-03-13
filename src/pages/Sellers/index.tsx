import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Container from "@components/Container";
import "./index.css";
import { ROUTES } from "./../../AppRouter";

const Sellers: React.FC = () => {
  const [isSellerCarsLoading, setIsSellerAllCarsLoading] = useState(false);

  const isLoading = isSellerCarsLoading;

  const sellers = [
    {
      id: 1,
      name: "Seller 1",
      address: "Masiv",
      phone: "077777777",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    },
    {
      id: 2,
      name: "Seller 2",
      address: "Masiv",
      phone: "077777777",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    },
    {
      id: 3,
      name: "Seller 3",
      address: "Masiv",
      phone: "077777777",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    },
    {
      id: 4,
      name: "Seller 4",
      address: "Masiv",
      phone: "077777777",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    },
  ];

  return (
    <IonPage className="requests">
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>Վաճառողներ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonLoading isOpen={isLoading} message="Loading..." spinner="circles" />
        <Container>
          <IonList inset={true}>
            {sellers?.map((seller) => {
              return (
                <IonItem
                  routerLink={ROUTES.SELLER.replace(":id", String(seller.id))}
                  key={seller.id}
                >
                  <IonLabel>{seller.name}</IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Sellers;
