import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Container from "@components/Container";
import "./index.css";
import { ROUTES } from "./../../AppRouter";
import { add, addOutline } from "ionicons/icons";
import { ISeller } from "@store/Store";
import { getAllSellers } from "@api/seller";

const Sellers: React.FC = () => {
  const [isAllSellersLoading, setIsAllSellersLoading] = useState(false);
  const [sellers, setSellers] = useState<ISeller[] | null>(null);

  useEffect(() => {
    (async () => {
      if (!sellers) {
        setIsAllSellersLoading(true);
        const { sellers } = await getAllSellers();
        setSellers(sellers);
        setIsAllSellersLoading(false);
      }
    })();
  }, [sellers]);

  const isLoading = isAllSellersLoading;

  // const sellers = [
  //   {
  //     id: 1,
  //     name: "Seller 1",
  //     address: "Masiv",
  //     phone: "077777777",
  //     created_at: "",
  //     updated_at: "",
  //     deleted_at: "",
  //   },
  //   {
  //     id: 2,
  //     name: "Seller 2",
  //     address: "Masiv",
  //     phone: "077777777",
  //     created_at: "",
  //     updated_at: "",
  //     deleted_at: "",
  //   },
  //   {
  //     id: 3,
  //     name: "Seller 3",
  //     address: "Masiv",
  //     phone: "077777777",
  //     created_at: "",
  //     updated_at: "",
  //     deleted_at: "",
  //   },
  //   {
  //     id: 4,
  //     name: "Seller 4",
  //     address: "Masiv",
  //     phone: "077777777",
  //     created_at: "",
  //     updated_at: "",
  //     deleted_at: "",
  //   },
  // ];

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

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton
            color={"dark"}
            routerLink={ROUTES.SELLER.replace(":id", String("create-seller"))}
          >
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Sellers;
