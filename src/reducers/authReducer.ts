import { User } from "../models/User";

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type AuthAction =
  | {
      type: "RESTORE_TOKEN";
      payload: { accessToken: string | null; refreshToken: string | null; user: User | null };
    }
  | { type: "LOGIN"; payload: { accessToken: string; refreshToken: string; user: User } }
  | { type: "LOGOUT" };

export const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
        isAuthenticated: !!action.payload.accessToken,
        isLoading: false,
      };
    case "LOGIN":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
}