import React, { useContext } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { AuthContext } from '../../AuthContext'
import AppStack from './AppStack'
import AuthStack from './AuthStack'


export default function RootNavigator() {
  const {
    state: { isLoading, userToken },
  } = useContext(AuthContext)

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return userToken == null ? <AuthStack /> : <AppStack />
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
