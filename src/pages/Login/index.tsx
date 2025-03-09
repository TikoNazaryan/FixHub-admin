import React, { useContext, useEffect } from "react";
// eslint-disable-next-line import/order
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonSpinner,
  IonText,
  IonToast,
} from "@ionic/react";

import "./index.css";
import { useState } from "react";
import { useMaskito } from "@maskito/react";
import { warningOutline } from "ionicons/icons";
import { STORAGE_KEY, useStorage } from "@hooks/useStorage";
import Container from "@components/Container";
import { getToken } from "@api/token";

import { ROUTES } from "../../AppRouter";
import { StoreContext } from "@store/Store";
import { Redirect } from "react-router";
import api from "@api/api";

const Login: React.FC = () => {
  const [phoneInput, setPhoneInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isError, setIsError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { isTokenSet, onSetIsTokenSet } = useContext(StoreContext);
  const { onSetStorage } = useStorage();

  const onPhoneChnage = (e: CustomEvent) => {
    const value = e.detail.value as string;
    setPhoneInput(value);
  };

  const onPasswordChnage = (e: CustomEvent) => {
    const value = e.detail.value as string;
    setPasswordInput(value);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const { token } = await getToken({
      phone: phoneInput.replace(/ /g, ""),
      password: passwordInput,
    });

    if (token) {
      onSetStorage(STORAGE_KEY.TOKEN, token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      onSetIsTokenSet(true);
    } else {
      setIsError("Մուտքագրված տվյալներով օգտատեր չի գտնվել");
    }

    setIsLoading(false);
  };

  const phoneMask = useMaskito({
    options: {
      mask: [
        "0",
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
      ],
    },
  });

  if (isTokenSet) {
    return <Redirect to={ROUTES.REQUESTS} />;
  }

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <Container>
          <IonText color={"dark"}>
            <h1 className="login_header">FixHub</h1>
          </IonText>

          <IonList inset={true}>
            <IonItem>
              <IonInput
                ref={async (phoneInput) => {
                  if (phoneInput) {
                    const input = await phoneInput.getInputElement();
                    phoneMask(input);
                  }
                }}
                labelPlacement="floating"
                type="tel"
                label="Հեռ."
                value={phoneInput}
                onIonInput={onPhoneChnage}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                labelPlacement="floating"
                label="Գաղտնաբառ"
                type="password"
                value={passwordInput}
                onIonInput={onPasswordChnage}
              ></IonInput>
            </IonItem>
          </IonList>
          <div className="ion-padding-horizontal login-buttons">
            <IonButton fill="outline" color={"dark"} onClick={onSubmit}>
              {isLoading ? (
                <IonSpinner color={"dark"} name="bubbles"></IonSpinner>
              ) : (
                "Մուտք"
              )}
            </IonButton>
            <IonButton
              fill="clear"
              color={"dark"}
              routerLink={ROUTES.REGISTRATION}
            >
              Գրանցում
            </IonButton>
          </div>
        </Container>
        <IonToast
          isOpen={!!isError}
          message={isError}
          onDidDismiss={() => setIsError(undefined)}
          duration={5000}
          color={"danger"}
          swipeGesture="vertical"
          icon={warningOutline}
          position="top"
          positionAnchor="header"
          buttons={[
            {
              text: "Լավ",
              role: "cancel",
            },
          ]}
        ></IonToast>
      </IonContent>
    </IonPage>
  );
};

export default Login;
