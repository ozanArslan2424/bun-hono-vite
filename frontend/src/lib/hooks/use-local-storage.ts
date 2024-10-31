"use client";
import { getErrorMessage } from "@/lib/utils";
import { useCallback, useState } from "react";

type LocalStorageKey = "user";

function setLocalStorage(key: LocalStorageKey, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return { success: true };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error("localStorage Error:", e);
    return { error: true };
  }
}

function getLocalStorage(key: LocalStorageKey) {
  try {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
    return undefined;
  } catch (error) {
    const e = getErrorMessage(error);
    console.error("localStorage Error:", e);
    return undefined;
  }
}

const useLocalStorage = <T>(key: LocalStorageKey, defaultValue: T) => {
  const [value, setValue] = useState(() => {
    try {
      const localValue = localStorage.getItem(key);
      if (localValue) {
        return JSON.parse(localValue) as T;
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (e) {
      const error = getErrorMessage(e);
      console.warn("Nothing found in localStorage, defaultValue will be used. Error:", error);

      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  // this method updates our localStorage and our state
  const setStateAndLocalStorage = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [key],
  );

  return [value, setStateAndLocalStorage] as const;
};

export { getLocalStorage, setLocalStorage, useLocalStorage };
