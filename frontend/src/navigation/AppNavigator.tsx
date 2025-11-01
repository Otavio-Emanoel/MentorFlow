import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HomeScreen } from '../screens';

// Stub de navegação: substitua pelo React Navigation quando desejar
export const AppNavigator: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
