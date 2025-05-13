import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
} from 'react';

export type User = {
  username: string;
  active: boolean;
  roleId: number;
  dateCreated: string;
  dateModified: string;
  lastName: string;
  firstName: string;
  displayName: string;
  jiraUsername: string;
  intactUserId: string;
  userId: number;
  emailAddress: string;
  openAtCurWeeksTimesheet: boolean;
  activeInterviewer: boolean;
  createIntacctTimesheet: boolean;
  roleName: string;
};

type State = {
  isLoading: boolean;
  userToken: string | null;
  refreshToken: string | null;
  user: User | null;
};

type Action =
  | { type: 'RESTORE_TOKEN'; token: string | null; refresh: string | null; user: User | null }
  | { type: 'SIGN_IN'; token: string; refresh: string; user: User }
  | { type: 'SIGN_OUT' };

type AuthContextType = {
  state: State;
  signIn: (token: string, refresh: string, user: User, expiryTs: number) => Promise<void>;
  signOut: () => Promise<void>;
};

const initialState: State = {
  isLoading: true,
  userToken: null,
  refreshToken: null,
  user: null,
};

function reducer(prev: State, action: Action): State {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prev,
        userToken: action.token,
        refreshToken: action.refresh,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prev,
        userToken: action.token,
        refreshToken: action.refresh,
        user: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...prev,
        userToken: null,
        refreshToken: null,
        user: null,
        isLoading: false,
      };
    default:
      return prev;
  }
}

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  signIn: async () => { },
  signOut: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const expiryTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSignOut = (expiryTs: number) => {
    if (expiryTimeout.current) clearTimeout(expiryTimeout.current);
    const delay = expiryTs - Date.now();
    if (delay <= 0) {
      dispatch({ type: 'SIGN_OUT' });
    } else {
      expiryTimeout.current = setTimeout(() => {
        dispatch({ type: 'SIGN_OUT' });
      }, delay);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const expiryStr = await AsyncStorage.getItem('tokenExpiry');
        const expiryTs = expiryStr ? Number(expiryStr) : undefined;

        if (expiryTs !== undefined && Date.now() > expiryTs) {
          dispatch({ type: 'SIGN_OUT' });
          return;
        }

        const [token, refresh, userJson] = await Promise.all([
          AsyncStorage.getItem('accessToken'),
          AsyncStorage.getItem('refreshToken'),
          AsyncStorage.getItem('userProfile'),
        ]);
        const user = userJson ? (JSON.parse(userJson) as User) : null;
        dispatch({ type: 'RESTORE_TOKEN', token, refresh, user });

        if (expiryTs) scheduleSignOut(expiryTs);
      } catch {
        dispatch({ type: 'SIGN_OUT' });
      }
    })();
  }, []);

  const signIn = async (
    token: string,
    refresh: string,
    user: User,
    expiryTs: number
  ) => {
    await AsyncStorage.setItem('tokenExpiry', expiryTs.toString());
    await AsyncStorage.setItem('accessToken', token);
    await AsyncStorage.setItem('refreshToken', refresh);
    await AsyncStorage.setItem('userProfile', JSON.stringify(user));
    dispatch({ type: 'SIGN_IN', token, refresh, user });

    scheduleSignOut(expiryTs);
  };

  const signOut = async () => {
    if (expiryTimeout.current) clearTimeout(expiryTimeout.current);
    await AsyncStorage.removeItem('tokenExpiry');
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('userProfile');
    dispatch({ type: 'SIGN_OUT' });
  };

  return (
    <AuthContext.Provider value={{ state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
