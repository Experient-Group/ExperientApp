import React, { createContext, useContext, useEffect, useReducer } from "react";
import { mockUser } from "../models/User";
import { authReducer, AuthState, initialState } from "../reducers/authReducer";
import { getTokensFromStorage, removeTokensFromStorage, setTokensInStorage } from "../utils/storage";

const AuthContext = createContext<{
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}>({
  state: initialState,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

 useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const { accessToken, refreshToken } = await getTokensFromStorage();
        dispatch({
          type: "RESTORE_TOKEN",
          payload: { accessToken, refreshToken, user: null },
        });
      } catch (e) {
        console.error("Error loading tokens from AsyncStorage", e);
        dispatch({
          type: "RESTORE_TOKEN",
          payload: { accessToken: null, refreshToken: null, user: null },
        });
      }
    };
    bootstrapAsync();
  }, []);

  const login = async (username: string, password: string) => {
    if (username && password) {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
      const accessToken = "abc123";
      const refreshToken = "xyz789";
      const user = mockUser;
      await setTokensInStorage(accessToken, refreshToken);
      dispatch({ type: "LOGIN", payload: { accessToken, refreshToken, user } });
    }
  };

  const logout = async () => {
    await removeTokensFromStorage();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
