import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SalonColors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSendOTP = async () => {
    setError('');
    
    if (!phoneNumber) {
      setError('Please enter your phone number');
      return;
    }

    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: '/(auth)/verify-otp',
        params: { phone: phoneNumber },
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.emoji}>💇‍♀️</Text>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Enter your phone number to continue</Text>

          <View style={styles.form}>
            <Input
              label="Phone Number"
              placeholder="Enter 10-digit phone number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              error={error}
            />

            <Button
              title="Send OTP"
              onPress={handleSendOTP}
              loading={loading}
              style={styles.button}
            />
          </View>

          <Text style={styles.terms}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SalonColors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  emoji: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: SalonColors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
  },
  terms: {
    fontSize: 12,
    color: SalonColors.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
});
