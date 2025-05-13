import type {} from '@jest/globals';
import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { Pressable, Text } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const TestComponent = () => {
  const { state, login, logout } = useAuth();
  return (
    <>
      <Text>{state.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</Text>
      <Text>{state.isLoading ? 'Loading' : 'Loaded'}</Text>
      <Text>{state.accessToken}</Text>
      <Text>{state.refreshToken}</Text>
      <Pressable accessibilityLabel="login" onPress={() => login('user', 'pass')}>
        <Text>Login</Text>
      </Pressable>
      <Pressable accessibilityLabel="logout" onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByText('Loading')).toBeTruthy();
  });

  it('should restore tokens and set authenticated', async () => {
    (AsyncStorage.getItem as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve('abc123')) // accessToken
      .mockImplementationOnce(() => Promise.resolve('xyz789')); // refreshToken

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => expect(getByText('Authenticated')).toBeTruthy());
    expect(getByText('Loaded')).toBeTruthy();
    expect(getByText('abc123')).toBeTruthy();
    expect(getByText('xyz789')).toBeTruthy();
  });

  it('should login and set tokens', async () => {
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

    const { getByText, getByLabelText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.press(getByLabelText('login'));
    });

    await waitFor(() => expect(getByText('Authenticated')).toBeTruthy());
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('accessToken', 'abc123');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('refreshToken', 'xyz789');
  });

  it('should logout and clear tokens', async () => {
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
    (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);

    const { getByText, getByLabelText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Login first
    await act(async () => {
      fireEvent.press(getByLabelText('login'));
    });

    // Then logout
    await act(async () => {
      fireEvent.press(getByLabelText('logout'));
    });

    await waitFor(() => expect(getByText('Not Authenticated')).toBeTruthy());
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('accessToken');
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('refreshToken');
  });
});