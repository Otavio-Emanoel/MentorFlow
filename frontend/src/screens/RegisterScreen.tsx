import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { colors as theme } from '../theme';

export const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <View style={styles.card}>
        <Text style={styles.title}>Criar conta</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Nome" style={styles.input} />
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" keyboardType="email-address" style={styles.input} />
        <TextInput value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry style={styles.input} />
        <Pressable style={styles.primaryButton} onPress={() => {}}>
          <Text style={styles.primaryButtonText}>Cadastrar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', padding: 16 },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 8 },
  title: { fontSize: 24, fontWeight: '700', color: theme.text, textAlign: 'center', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: theme.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 12, fontSize: 16, backgroundColor: '#fff' },
  primaryButton: { backgroundColor: theme.primary, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
