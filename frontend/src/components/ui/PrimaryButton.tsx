import React from 'react';
import { Pressable, Text, StyleSheet, PressableProps, StyleProp, ViewStyle } from 'react-native';

export type PrimaryButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  style?: StyleProp<ViewStyle>;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, style, ...rest }) => {
  return (
    <Pressable accessibilityRole="button" style={[styles.button, style as any]} {...rest}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
