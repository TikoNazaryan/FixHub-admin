import React, { useContext, useEffect, useState } from "react";
import {
  IonBadge,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./index.css";
import { Status, StoreContext } from "@store/Store";
import Container from "@components/Container";
import { ROUTES } from "./../../AppRouter";

const ApprovedOfers: React.FC = () => {
  const { approvedRequests } = useContext(StoreContext);

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>Առաջարկներ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonLoading
          isOpen={!approvedRequests}
          message="Loading..."
          spinner="circles"
        />
        <Container>
          {approvedRequests
            ?.sort(
              (a, b) =>
                b.offers.filter((item) => item.status === Status.pending)
                  ?.length -
                a.offers.filter((item) => item.status === Status.pending)
                  ?.length
            )
            ?.map((request) => {
              return (
                <IonItem
                  key={request.id}
                  routerLink={ROUTES.REQUEST.replace(":id", String(request.id))}
                >
                  {" "}
                  <IonLabel>
                    {" "}
                    {request.brand.name} {request.description}
                  </IonLabel>
                  <IonLabel>{request.vin}</IonLabel>
                  {request.offers.filter(
                    (item) => item.status === Status.pending
                  ).length > 0 && (
                    <IonBadge>
                      {
                        request.offers.filter(
                          (item) => item.status === Status.pending
                        ).length
                      }
                    </IonBadge>
                  )}
                </IonItem>
              );
            })}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default ApprovedOfers;
