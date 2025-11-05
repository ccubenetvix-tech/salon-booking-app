import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackToStart = () => {
    router.replace('/get-started');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Profile</ThemedText>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={28} color="#4E342E" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.profileInfo,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={60} color="#4E342E" />
            <View style={styles.onlineIndicator} />
          </View>
          <ThemedText style={styles.name}>Sophia Martinez</ThemedText>
          <ThemedText style={styles.phone}>+1 (555) 987-6543</ThemedText>
          <ThemedText style={styles.email}>sophia.martinez@gmail.com</ThemedText>
          <View style={styles.membershipBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <ThemedText style={styles.membershipText}>Premium Member</ThemedText>
          </View>
        </Animated.View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="calendar-outline" size={24} color="#4E342E" />
            <ThemedText style={styles.menuText}>My Bookings</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="heart-outline" size={24} color="#4E342E" />
            <ThemedText style={styles.menuText}>Favorites</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card-outline" size={24} color="#4E342E" />
            <ThemedText style={styles.menuText}>Payment Methods</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#4E342E" />
            <ThemedText style={styles.menuText}>Settings</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackToStart}
        >
          <ThemedText style={styles.backButtonText}>Back to Start</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4E342E',
  },
  settingsButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#4E342E',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 4,
    borderColor: '#F3EFE9',
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#fff',
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  membershipText: {
    color: '#F57C00',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#4E342E',
    marginBottom: 5,
    opacity: 0.8,
  },
  email: {
    fontSize: 16,
    color: '#4E342E',
    marginBottom: 20,
    opacity: 0.8,
  },
  menuSection: {
    width: '100%',
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 22,
    marginBottom: 12,
    borderRadius: 18,
    shadowColor: '#4E342E',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(78, 52, 46, 0.03)',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#4E342E',
    marginLeft: 15,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#4E342E',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});