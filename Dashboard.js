// DashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  // You can add any content or functionality you want for your dashboard here.
  // For simplicity, we'll just display a welcome message and a button to log out.

  const handleLogout = () => {
    // Implement the logout logic here, e.g., clearing user authentication.
    // You can use AsyncStorage or a state management solution to manage user authentication state.

    // For simplicity, we'll navigate back to the login screen.
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Dashboard!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default DashboardScreen;
