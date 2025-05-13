import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../AuthContext';

export default function HomeScreen() {
  const {
    state: { user },
  } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.firstName}!</Text>
      <Text style={styles.subtitle}>You will be logged out in 20 secs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
    color: '#666',
  },
});
