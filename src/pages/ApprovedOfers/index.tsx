import React, { useContext, useEffect, useState } from "react";
import {
  IonAccordion,
  IonAccordionGroup,
  IonBadge,
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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./index.css";
import { Status, StoreContext } from "@store/Store";
import Container from "@components/Container";
import { ROUTES } from "./../../AppRouter";
import Offers from "@pages/Offers";
export const requests = [
  {
    id: 1,
    brand_id: 1,
    model_id: null,
    user_id: 3,
    user_phone: null,
    user_hash: null,
    vin: null,
    deleted_at: null,
    created_at: "2025-03-09T17:55:29.000000Z",
    updated_at: "2025-03-09T17:55:29.000000Z",
    description: "",
    brand: {
      id: 1,
      name: "Seat",
      created_at: "2025-03-08T23:12:34.000000Z",
      updated_at: "2025-03-08T23:12:34.000000Z",
    },
    model: null,
    user: {
      id: 3,
      name: "valod123",
      address: "vagennov",
      phone: "077777777",
      created_at: "2025-03-08T23:23:17.000000Z",
      updated_at: "2025-03-12T19:36:06.000000Z",
      deleted_at: null,
      role: "seller",
    },
    offers: [
      {
        id: 7,
        request_id: 1,
        user_id: 4,
        price: "2.023",
        part_number: "asd1231",
        condition: "new",
        status: "pending",
        deleted_at: null,
        created_at: "2025-03-13T14:22:17.000000Z",
        updated_at: "2025-03-13T14:22:17.000000Z",
      },
      {
        id: 8,
        request_id: 12,
        user_id: 4,
        price: "2.0235",
        part_number: "asd1264543",
        condition: "new",
        status: "approved",
        deleted_at: null,
        created_at: "2025-03-15T06:19:09.000000Z",
        updated_at: "2025-03-16T12:38:38.000000Z",
      },
      {
        id: 7,
        request_id: 1,
        user_id: 4,
        price: "2.023",
        part_number: "asd1231",
        condition: "new",
        status: "pending",
        deleted_at: null,
        created_at: "2025-03-13T14:22:17.000000Z",
        updated_at: "2025-03-13T14:22:17.000000Z",
      },
      {
        id: 8,
        request_id: 12,
        user_id: 4,
        price: "2.0235",
        part_number: "asd1264543",
        condition: "new",
        status: "approved",
        deleted_at: null,
        created_at: "2025-03-15T06:19:09.000000Z",
        updated_at: "2025-03-16T12:38:38.000000Z",
      },
    ],
  },
  {
    id: 2,
    brand_id: 1,
    model_id: null,
    user_id: 3,
    user_phone: null,
    user_hash: null,
    vin: null,
    deleted_at: null,
    created_at: "2025-03-09T17:55:37.000000Z",
    updated_at: "2025-03-09T17:55:37.000000Z",
    description: "",
    brand: {
      id: 1,
      name: "Seat",
      created_at: "2025-03-08T23:12:34.000000Z",
      updated_at: "2025-03-08T23:12:34.000000Z",
    },
    model: null,
    user: {
      id: 3,
      name: "valod123",
      address: "vagennov",
      phone: "077777777",
      created_at: "2025-03-08T23:23:17.000000Z",
      updated_at: "2025-03-12T19:36:06.000000Z",
      deleted_at: null,
      role: "seller",
    },
    offers: [],
  },
  {
    id: 3,
    brand_id: 1,
    model_id: null,
    user_id: 3,
    user_phone: null,
    user_hash: null,
    vin: null,
    deleted_at: null,
    created_at: "2025-03-09T18:05:17.000000Z",
    updated_at: "2025-03-09T18:05:17.000000Z",
    description: "",
    brand: {
      id: 1,
      name: "Seat",
      created_at: "2025-03-08T23:12:34.000000Z",
      updated_at: "2025-03-08T23:12:34.000000Z",
    },
    model: null,
    user: {
      id: 3,
      name: "valod123",
      address: "vagennov",
      phone: "077777777",
      created_at: "2025-03-08T23:23:17.000000Z",
      updated_at: "2025-03-12T19:36:06.000000Z",
      deleted_at: null,
      role: "seller",
    },
    offers: [
      {
        id: 7,
        request_id: 1,
        user_id: 4,
        price: "2.023",
        part_number: "asd1231",
        condition: "new",
        status: "pending",
        deleted_at: null,
        created_at: "2025-03-13T14:22:17.000000Z",
        updated_at: "2025-03-13T14:22:17.000000Z",
      },
      {
        id: 8,
        request_id: 12,
        user_id: 4,
        price: "2.0235",
        part_number: "asd1264543",
        condition: "new",
        status: "approved",
        deleted_at: null,
        created_at: "2025-03-15T06:19:09.000000Z",
        updated_at: "2025-03-16T12:38:38.000000Z",
      },
    ],
  },
  {
    id: 4,
    brand_id: 1,
    model_id: 2,
    user_id: 5,
    user_phone: null,
    user_hash: null,
    vin: "123123123123",
    deleted_at: null,
    created_at: "2025-03-09T19:28:44.000000Z",
    updated_at: "2025-03-09T19:28:44.000000Z",
    description: "Razvali tulki",
    brand: {
      id: 1,
      name: "Seat",
      created_at: "2025-03-08T23:12:34.000000Z",
      updated_at: "2025-03-08T23:12:34.000000Z",
    },
    model: {
      id: 2,
      brand_id: 1,
      name: "Altea",
      created_at: "2025-03-08T23:12:34.000000Z",
      updated_at: "2025-03-08T23:12:34.000000Z",
    },
    user: {
      id: 5,
      name: "valod",
      address: "vagennov",
      phone: "000000000",
      created_at: "2025-03-09T19:21:30.000000Z",
      updated_at: "2025-03-09T19:21:30.000000Z",
      deleted_at: null,
      role: "seller",
    },
    offers: [],
  },
  {
    id: 5,
    brand_id: 1,
    model_id: 2,
    user_id: 5,
    user_phone: null,
    user_hash: null,
    vin: "4444444444",
    deleted_at: null,
    created_at: "2025-03-09T20:00:37.000000Z",
    updated_at: "2025-03-09T20:00:37.000000Z",
    description: "Razvali tulki 2",
    brand: {
      id: 1,
      name: "Seat",
      created_at: "2025-03-08T23:12:34.000000Z",
      updated_at: "2025-03-08T23:12:34.000000Z",
    },
    model: {
      id: 2,
      brand_id: 1,
      name: "Altea",
      created_at: "2025-03-08T23:12:34.000000Z",
      updated_at: "2025-03-08T23:12:34.000000Z",
    },
    user: {
      id: 5,
      name: "valod",
      address: "vagennov",
      phone: "000000000",
      created_at: "2025-03-09T19:21:30.000000Z",
      updated_at: "2025-03-09T19:21:30.000000Z",
      deleted_at: null,
      role: "seller",
    },
    offers: [],
  },
  {
    id: 6,
    brand_id: 1,
    model_id: 2,
    user_id: 5,
    user_phone: null,
    user_hash: null,
    vin: "4444444444",
    deleted_at: null,
    created_at: "2025-03-09T20:00:53.000000Z",
    updated_at: "2025-03-09T20:00:53.000000Z",
    description: "Razvali tulki 23",
    brand: {
      id: 1,
      name: "Seat",
      created_at: "2025-03-08T23:12:34.000000Z",
      updated_at: "2025-03-08T23:12:34.000000Z",
    },
    model: {
      id: 2,
      brand_id: 1,
      name: "Altea",
      created_at: "2025-03-08T23:12:34.000000Z",
      updated_at: "2025-03-08T23:12:34.000000Z",
    },
    user: {
      id: 5,
      name: "valod",
      address: "vagennov",
      phone: "000000000",
      created_at: "2025-03-09T19:21:30.000000Z",
      updated_at: "2025-03-09T19:21:30.000000Z",
      deleted_at: null,
      role: "seller",
    },
    offers: [],
  },
];

const ApprovedOfers: React.FC = () => {
  const { approvedOffers, onSetApprovedOffers } = useContext(StoreContext);

  const onApprove = () => {};

  const onReject = () => {};

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>Առաջարկներ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonLoading
          isOpen={!approvedOffers}
          message="Loading..."
          spinner="circles"
        />
        <Container>
          {requests
            .sort(
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
