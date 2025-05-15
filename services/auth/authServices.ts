import { loginUrl } from "@/constants/constants";
import { mockResponse } from "@/constants/mockResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "@/state/store";
import { clearTokens, saveTokens } from "@/state/auth/authSlice";
import { router } from "expo-router";

export const login = async (username: string, password: string) => {
  if (username !== "" && password !== "") {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    //need to change the if condition for real response
    if (response) {
      store.dispatch(
        saveTokens({
          isAuthenticated: true,
          accessToken: mockResponse.accessToken,
          refreshToken: mockResponse.refreshToken,
        })
      );
      await AsyncStorage.setItem("accessToken", mockResponse.accessToken);
      await AsyncStorage.setItem("refreshToken", mockResponse.refreshToken);
      return mockResponse;
    }
  } else {
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    store.dispatch(clearTokens());
    router.replace("/(auth)/login");
  } catch (error) {
    console.error(error);
  }
};

export const storeTokenFromStorage = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (accessToken) {
      store.dispatch(
        saveTokens({
          isAuthenticated: true,
          accessToken,
          refreshToken: refreshToken ?? "",
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
};
