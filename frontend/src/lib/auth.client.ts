import { createAuthClient } from "better-auth/react";
import type { LoginFormValues, RegisterFormValues, SelectUser } from "@shared/types";
import { getErrorMessage } from "./utils";

const { signIn, signOut, signUp, useSession: useSess, updateUser, getSession } = createAuthClient();

export { getSession };

export function useSession() {
  const sessionRes = useSess();
  return { ...sessionRes, data: { ...sessionRes.data, user: sessionRes.data?.user as SelectUser } };
}

export async function loginWithCredentials(values: LoginFormValues) {
  try {
    const { error } = await signIn.email({
      email: values.email,
      password: values.password,
      dontRememberMe: values.rememberMe !== "on",
    });

    if (error) throw error;
  } catch (error) {
    getErrorMessage(error);
  }
}

export async function registerWithCredentials(values: RegisterFormValues) {
  try {
    const { error } = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (error) throw error;
  } catch (error) {
    getErrorMessage(error);
  }
}

export async function logout() {
  try {
    const { error } = await signOut();

    if (error) throw error;
  } catch (error) {
    getErrorMessage(error);
  }
}

export async function updateUserData(values: { name: string; imageUrl?: string }) {
  try {
    const { error } = await updateUser({
      name: values.name,
      image: values.imageUrl,
    });

    if (error) throw error;
  } catch (error) {
    getErrorMessage(error);
  }
}
