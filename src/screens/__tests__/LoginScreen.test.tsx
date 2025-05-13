import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { AuthProvider } from "../../context/AuthContext";
import LoginScreen from "../LoginScreen";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("LoginScreen integration", () => {
  it("shows error if fields are empty", () => {
    const { getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );
    fireEvent.press(getByText("Login"));
    expect(getByText("Please enter both fields")).toBeTruthy();
  });

  it("logs in with valid credentials", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText("Username"), "user");
    fireEvent.changeText(getByPlaceholderText("Password"), "pass");
    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(queryByText("Please enter both fields")).toBeNull();
    });
  });
});
