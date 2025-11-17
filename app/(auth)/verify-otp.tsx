import { Button } from '@/components/ui/button';
import { SalonColors } from '@/constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function VerifyOTPScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to home after successful verification
      router.replace('/(app)/home' as any);
    }, 1000);
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    // Mock resend OTP
    alert('OTP resent successfully!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>📱</Text>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to{'\n'}
          <Text style={styles.phone}>{phone}</Text>
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={[styles.otpInput, error && styles.otpInputError]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Button
          title="Verify & Continue"
          onPress={handleVerify}
          loading={loading}
          style={styles.button}
        />

        <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
          <Text style={styles.resendText}>Didn't receive code? Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SalonColors.background,
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
    lineHeight: 24,
  },
  phone: {
    fontWeight: '600',
    color: SalonColors.primary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    width: 50,
    height: 56,
    borderWidth: 2,
    borderColor: SalonColors.border,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    backgroundColor: SalonColors.white,
  },
  otpInputError: {
    borderColor: SalonColors.error,
  },
  errorText: {
    color: SalonColors.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  resendButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  resendText: {
    color: SalonColors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
