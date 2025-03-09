import React, { useMemo } from "react";
// eslint-disable-next-line import/order
import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";

import "./index.css";
import { useContext, useEffect, useState } from "react";
import { getCars } from "@api/cars";
import Container from "@components/Container";
import { StoreContext } from "@store/Store";
import { getSellerCars, updateSellerCars } from "@api/seller";
import { getFlatCarModelIds } from "@utils/cars";
import { checkmarkCircleOutline } from "ionicons/icons";

const Cars: React.FC = () => {
  const [isAllCarsLoading, setIsAllCarsLoading] = useState(false);
  const [isSellerCarsLoading, setIsSellerAllCarsLoading] = useState(false);
  const [isSellerCarsSaveLoading, setIsSellerCarsSaveLoading] = useState(false);
  const [isSellerCarsSaveSuccess, setIsSellerCarsSaveSuccess] = useState(false);
  const [tempSelectedCars, setTempSelectedCars] = useState<number[]>();

  const { cars, onSetCars, sellerCars, onSetSellerCars } =
    useContext(StoreContext);

  const onCarModelChange = (id: number, checked: boolean) => {
    setTempSelectedCars((prev) => {
      if (!prev) return prev;

      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  };

  const onCarModelSave = async () => {
    if (!tempSelectedCars) return;

    setIsSellerCarsSaveLoading(true);
    const { status } = await updateSellerCars({ model_ids: tempSelectedCars });

    if (status === "updated") {
      setIsSellerCarsSaveSuccess(true);
    }

    setIsSellerCarsSaveLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (!cars) {
        setIsAllCarsLoading(true);
        const { cars } = await getCars();
        onSetCars(cars);
        setIsAllCarsLoading(false);
      }
    })();
  }, [cars]);

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

  useEffect(() => {
    if (sellerCars) {
      setTempSelectedCars(getFlatCarModelIds(sellerCars));
    }
  }, [sellerCars]);

  const isLoading =
    isAllCarsLoading || isSellerCarsLoading || isSellerCarsSaveLoading;

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="#"></IonBackButton>
          </IonButtons>
          <IonTitle>Մեքենաներ</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCarModelSave} color="primary">
              Պահպանել
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonLoading isOpen={isLoading} message="Loading..." spinner="circles" />
        {cars && (
          <Container>
            <IonAccordionGroup expand="inset">
              {cars.map((car) => {
                return (
                  <IonAccordion value={car.name} key={car.id}>
                    <IonItem slot="header" color="light">
                      <IonLabel>{car.name}</IonLabel>
                    </IonItem>
                    <div slot="content">
                      <IonList>
                        {car.models.map((model) => (
                          <IonItem key={model.id}>
                            <IonCheckbox
                              checked={tempSelectedCars?.includes(model.id)}
                              labelPlacement="fixed"
                              onIonChange={(e: CustomEvent) =>
                                onCarModelChange(model.id, e.detail.checked)
                              }
                            >
                              {model.name}
                            </IonCheckbox>
                          </IonItem>
                        ))}
                      </IonList>
                    </div>
                  </IonAccordion>
                );
              })}
            </IonAccordionGroup>
          </Container>
        )}
      </IonContent>
      <IonToast
        isOpen={!!isSellerCarsSaveSuccess}
        message={"Նոր մեքենայի մոդելները հաջողությամբ պահպանվել են"}
        onDidDismiss={() => setIsSellerCarsSaveSuccess(false)}
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
    </IonPage>
  );
};

export default Cars;
