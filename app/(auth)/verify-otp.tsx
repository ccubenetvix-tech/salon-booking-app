import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/context/auth';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function VerifyOTPScreen() {
    const { phone } = useLocalSearchParams<{ phone: string }>();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const { verifyOTP, signInWithPhone } = useAuth();

    const inputRefs = useRef<(TextInput | null)[]>([]);

    const handleOtpChange = (value: string, index: number) => {
        if (value.length > 1) return; // Prevent multiple characters

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setErrorMsg('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            setErrorMsg('Please enter the complete 6-digit code');
            return;
        }

        setLoading(true);
        setErrorMsg('');

        const result = await verifyOTP(phone!, otpCode);

        if (result.error) {
            console.error('Error verifying OTP:', result.error);
            setErrorMsg(result.error.message || 'Invalid verification code. Please try again.');
            setLoading(false);
            return;
        }

        console.log('OTP verified successfully');
        router.replace('/(app)/home');
        setLoading(false);
    };

    const handleResendOTP = async () => {
        setResendLoading(true);
        setErrorMsg('');

        const result = await signInWithPhone(phone!);

        if (result.error) {
            setErrorMsg('Failed to resend code. Please try again.');
        } else {
            setErrorMsg('');
            // You might want to show a success message here
        }

        setResendLoading(false);
    };

    useEffect(() => {
        // Auto-verify when all 6 digits are entered
        const otpCode = otp.join('');
        if (otpCode.length === 6) {
            handleVerifyOTP();
        }
    }, [otp]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ThemedText style={styles.title}>Enter Verification Code</ThemedText>
                <ThemedText style={styles.subtitle}>
                    We sent a 6-digit code to {phone}
                </ThemedText>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                inputRefs.current[index] = ref;
                            }}
                            style={[
                                styles.otpInput,
                                digit ? styles.otpInputFilled : null,
                                errorMsg ? styles.otpInputError : null,
                            ]}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            selectTextOnFocus
                        />
                    ))}
                </View>

                {errorMsg ? (
                    <ThemedText style={styles.errorText}>{errorMsg}</ThemedText>
                ) : null}

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleVerifyOTP}
                    disabled={loading || otp.join('').length !== 6}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <ThemedText style={styles.buttonText}>
                            Verify Code
                        </ThemedText>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.resendButton}
                    onPress={handleResendOTP}
                    disabled={resendLoading}
                >
                    {resendLoading ? (
                        <ActivityIndicator color="#4E342E" size="small" />
                    ) : (
                        <ThemedText style={styles.resendText}>
                            Didn't receive the code? Resend
                        </ThemedText>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3EFE9',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4E342E',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#4E342E',
        marginBottom: 40,
        opacity: 0.8,
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        width: '100%',
        maxWidth: 300,
    },
    otpInput: {
        width: 45,
        height: 55,
        backgroundColor: 'white',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4E342E',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    otpInputFilled: {
        borderColor: '#4E342E',
    },
    otpInputError: {
        borderColor: '#ff3b30',
    },
    errorText: {
        color: '#ff3b30',
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4E342E',
        paddingHorizontal: 60,
        paddingVertical: 15,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    resendButton: {
        paddingVertical: 10,
    },
    resendText: {
        color: '#4E342E',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});