import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PrimaryButton } from '../components/ui/PrimaryButton';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MentorFlow</Text>
      <Text style={styles.subtitle}>Tela inicial de exemplo</Text>
      <PrimaryButton label="Começar" onPress={() => { /* navegação futura */ }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
});
