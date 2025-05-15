import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
}

const initialState = {
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false,
} satisfies AuthState as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveTokens: (
      state,
      action: PayloadAction<{
        isAuthenticated: boolean;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens: (state) => {
      state.isAuthenticated = false;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { saveTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
