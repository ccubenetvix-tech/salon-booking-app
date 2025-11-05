import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const services = [
    { id: 1, name: 'Hair Styling', icon: 'cut-outline', price: '$45' },
    { id: 2, name: 'Manicure', icon: 'hand-left-outline', price: '$25' },
    { id: 3, name: 'Facial', icon: 'happy-outline', price: '$60' },
    { id: 4, name: 'Massage', icon: 'body-outline', price: '$80' },
  ];

  const beauticians = [
    { id: 1, name: 'Sarah Johnson', rating: 4.9, speciality: 'Hair Specialist' },
    { id: 2, name: 'Emma Davis', rating: 4.8, speciality: 'Nail Artist' },
    { id: 3, name: 'Lisa Wilson', rating: 4.9, speciality: 'Skincare Expert' },
  ];

  return (
    <ThemedView style={styles.container}>
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View>
          <ThemedText style={styles.greeting}>Hello, Sophia! 👋</ThemedText>
          <ThemedText style={styles.subtitle}>Book your beauty session</ThemedText>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={28} color="#4E342E" />
          <View style={styles.notificationBadge}>
            <ThemedText style={styles.badgeText}>3</ThemedText>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <Animated.View 
          style={[
            styles.searchContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Ionicons name="search" size={20} color="#999" />
          <ThemedText style={styles.searchText}>Search services...</ThemedText>
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic-outline" size={18} color="#4E342E" />
          </TouchableOpacity>
        </Animated.View>

        {/* Services Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Popular Services</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
            {services.map((service) => (
              <TouchableOpacity key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceIcon}>
                  <Ionicons name={service.icon as any} size={24} color="#4E342E" />
                </View>
                <ThemedText style={styles.serviceName}>{service.name}</ThemedText>
                <ThemedText style={styles.servicePrice}>{service.price}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Beauticians */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Top Beauticians</ThemedText>
          {beauticians.map((beautician) => (
            <TouchableOpacity key={beautician.id} style={styles.beauticianCard}>
              <View style={styles.beauticianAvatar}>
                <Ionicons name="person" size={30} color="#4E342E" />
              </View>
              <View style={styles.beauticianInfo}>
                <ThemedText style={styles.beauticianName}>{beautician.name}</ThemedText>
                <ThemedText style={styles.beauticianSpeciality}>{beautician.speciality}</ThemedText>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <ThemedText style={styles.rating}>{beautician.rating}</ThemedText>
                </View>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <ThemedText style={styles.bookButtonText}>Book</ThemedText>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="calendar" size={24} color="#4E342E" />
              <ThemedText style={styles.actionText}>Book Now</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="heart" size={24} color="#4E342E" />
              <ThemedText style={styles.actionText}>Favorites</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="gift" size={24} color="#4E342E" />
              <ThemedText style={styles.actionText}>Offers</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Bottom padding for navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>
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
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: '#4E342E',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B5B73',
    opacity: 0.8,
    marginTop: 4,
    fontWeight: '500',
  },
  notificationButton: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 30,
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(78, 52, 46, 0.05)',
  },
  searchText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#999',
  },
  micButton: {
    padding: 8,
    backgroundColor: '#F3EFE9',
    borderRadius: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 15,
  },
  servicesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    marginRight: 16,
    alignItems: 'center',
    width: 130,
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(78, 52, 46, 0.05)',
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3EFE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4E342E',
    textAlign: 'center',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E342E',
  },
  beauticianCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(78, 52, 46, 0.03)',
  },
  beauticianAvatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#F3EFE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  beauticianInfo: {
    flex: 1,
  },
  beauticianName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 2,
  },
  beauticianSpeciality: {
    fontSize: 14,
    color: '#4E342E',
    opacity: 0.7,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#4E342E',
    marginLeft: 5,
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#4E342E',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 12,
    color: '#4E342E',
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 20,
  },
});