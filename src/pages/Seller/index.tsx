import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import Container from "@components/Container";
import "./index.css";
import { useParams } from "react-router";
import { ISeller } from "@store/Store";
import { getSeller, updateSeller } from "@api/seller";
import { phoneMaskPattern } from "@utils/phone";
import { useMaskito } from "@maskito/react";
import { add, checkmarkCircleOutline } from "ionicons/icons";

const Sellers: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isSellerLoading, setIsSellerLoading] = useState(false);
  const [isSellerUpdateLoading, setIsSellerUpdateLoading] = useState(false);
  const [isSellerUpdateSuccess, setIsSellerUpdateSuccess] = useState(false);
  const [seller, setSeller] = useState<ISeller>();

  const [nameInput, setNameInput] = useState<string>("");
  const [addressInput, setAddressInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");

  const onNameInputChange = (e: CustomEvent) => {
    setNameInput(e.detail.value);
  };

  const onAddressInputChange = (e: CustomEvent) => {
    setAddressInput(e.detail.value);
  };

  const onPhoneInputChange = (e: CustomEvent) => {
    setPhoneInput(e.detail.value);
  };

  const onSave = async () => {
    setIsSellerUpdateLoading(true);
    const { status } = await updateSeller({
      id,
      name: nameInput,
      phone: phoneInput,
      address: addressInput,
    });
    if (status === "updated") {
      setIsSellerUpdateSuccess(true);
    }

    setIsSellerUpdateLoading(false);
  };

  const phoneMask = useMaskito(phoneMaskPattern);

  useEffect(() => {
    (async () => {
      if (!seller) {
        setIsSellerLoading(true);
        const { user } = await getSeller({ id });
        setSeller(user);
        setIsSellerLoading(false);
      }
    })();
  }, [seller]);

  useEffect(() => {
    if (seller) {
      setNameInput(seller.name);
      setAddressInput(seller.address);
      setPhoneInput(seller.phone);
    }
  }, [JSON.stringify(seller)]);

  const isLoading = isSellerLoading || isSellerUpdateLoading;

  return (
    <IonPage className="requests">
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="#"></IonBackButton>
          </IonButtons>
          <IonTitle>Վաճառող {id}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onSave} color="primary">
              Պահպանել
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonLoading isOpen={isLoading} message="Loading..." spinner="circles" />
        <Container>
          <IonList inset={true}>
            <IonItem>
              <IonInput
                label="Անուն"
                labelPlacement="floating"
                value={nameInput}
                onIonInput={onNameInputChange}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Հասցե"
                labelPlacement="floating"
                value={addressInput}
                onIonInput={onAddressInputChange}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                ref={async (phoneInput) => {
                  if (phoneInput) {
                    const input = await phoneInput.getInputElement();
                    phoneMask(input);
                  }
                }}
                label="Հեռախոս"
                labelPlacement="floating"
                value={phoneInput}
                onIonInput={onPhoneInputChange}
              ></IonInput>
            </IonItem>
          </IonList>
        </Container>
      </IonContent>
      <IonToast
        isOpen={!!isSellerUpdateSuccess}
        message={"Վաճառողը հաջողությամբ թարմացվել է"}
        onDidDismiss={() => setIsSellerUpdateSuccess(false)}
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

export default Sellers;
