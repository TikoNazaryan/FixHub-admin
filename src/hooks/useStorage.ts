import { Preferences } from "@capacitor/preferences";

export const STORAGE_KEY = {
  TOKEN: "token",
  IS_DARK: "true",
};

export const useStorage = () => {
  const onSetStorage = async (key: string, value: string) => {
    await Preferences.set({
      key,
      value,
    });
  };

  const onGetStorage = async (key: string) => {
    const { value } = await Preferences.get({ key });
    return value;
  };

  const onRemoveStorage = async (key: string) => {
    await Preferences.remove({ key });
  };

  return { onSetStorage, onGetStorage, onRemoveStorage };
};
