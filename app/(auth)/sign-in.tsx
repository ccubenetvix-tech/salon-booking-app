import GoogleIcon from '@/components/google-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/auth';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function SignInScreen() {
  const { signInWithGoogle, testLogin } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      console.log('Initiating Google sign-in...');
      const redirectUrl = Linking.createURL('');
      console.log('Redirect URL:', redirectUrl);
      
      const { data, error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google Sign-in error:', error);
        return;
      }

      if (data?.url) {
        console.log('Opening OAuth URL:', data.url);
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl
        );
        
        console.log('WebBrowser result:', result);
        
        if (result.type === 'success') {
          // Handle successful authentication
          const { url: returnUrl } = result;
          console.log('Success URL:', returnUrl);
          
          // Parse the URL to handle the authentication result
          const url = new URL(returnUrl);
          const params = url.searchParams;
          
          if (params.has('error')) {
            console.error('OAuth error:', params.get('error'));
            throw new Error(params.get('error_description') || 'Authentication failed');
          }
        } else if (result.type === 'dismiss') {
          console.log('User dismissed the authentication window');
        }
      } else {
        console.log('No URL returned from signInWithGoogle');
      }
    } catch (error) {
      console.error('Error in handleGoogleSignIn:', error);
      Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
    }
  };

  const handleTestLogin = () => {
    testLogin();
    router.replace('/(app)/home');
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/splash-logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ThemedText style={styles.title}>Welcome Back</ThemedText>
      <ThemedText style={styles.subtitle}>
        Choose your preferred sign-in method
      </ThemedText>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
        >
          <GoogleIcon size={24} />
          <ThemedText style={styles.googleButtonText}>
            Continue with Google
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.testButton}
          onPress={handleTestLogin}
        >
          <ThemedText style={styles.testButtonText}>
            🚀 Test Login
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EFE9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4E342E',
    marginBottom: 40,
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  testButton: {
    backgroundColor: '#4E342E',
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
    shadowColor: '#4E342E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#4E342E',
    fontSize: 16,
    fontWeight: '600',
  },
  testButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});