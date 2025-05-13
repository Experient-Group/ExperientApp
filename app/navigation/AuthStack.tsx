import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LoginScreen from '../screens/LoginScreen'

export type AuthenticationStackParamList = {
  Login: undefined
}

const Stack = createNativeStackNavigator<AuthenticationStackParamList>()

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}
