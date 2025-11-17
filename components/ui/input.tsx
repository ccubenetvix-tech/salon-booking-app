import { SalonColors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={SalonColors.textLight}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: SalonColors.white,
    borderWidth: 1,
    borderColor: SalonColors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: SalonColors.textPrimary,
  },
  inputError: {
    borderColor: SalonColors.error,
  },
  errorText: {
    color: SalonColors.error,
    fontSize: 12,
    marginTop: 4,
  },
});
