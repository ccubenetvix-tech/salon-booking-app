import { SalonColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const quickActions = [
    {
      id: '1',
      title: 'Book Salon',
      icon: '💇',
      color: SalonColors.primary,
      route: '/salon/categories',
    },
    {
      id: '2',
      title: 'At-Home',
      icon: '🏠',
      color: SalonColors.secondary,
      route: '/home-service/categories',
    },
  ];

  const featuredSalons = [
    {
      id: '1',
      name: 'Glamour Studio',
      image: require('@/assets/images/salon1.jpg'),
      rating: 4.8,
      distance: '2.5 km',
      services: 'Hair, Nails, Spa',
    },
    {
      id: '2',
      name: 'Beauty Haven',
      image: require('@/assets/images/salon2.jpg'),
      rating: 4.6,
      distance: '3.2 km',
      services: 'Makeup, Skin, Waxing',
    },
  ];

  const popularServices = [
    { id: '1', name: 'Haircut & Styling', icon: '✂️', price: '₹500' },
    { id: '2', name: 'Manicure & Pedicure', icon: '💅', price: '₹800' },
    { id: '3', name: 'Facial & Cleanup', icon: '✨', price: '₹1500' },
    { id: '4', name: 'Body Massage', icon: '💆', price: '₹2000' },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/splash-logo.jpg')}
              style={styles.logo}
              contentFit="cover"
            />
          </View>
          <View style={styles.brandContainer}>
            <Text style={styles.brandName}>Salon Booking</Text>
            <Text style={styles.brandTagline}>Your beauty, our priority</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => router.push('/notifications' as any)}
          >
            <Ionicons name="notifications-outline" size={24} color={SalonColors.textPrimary} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Hello! 👋</Text>
          <Text style={styles.subtitle}>What would you like to do today?</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { backgroundColor: action.color }]}
              onPress={() => router.push(action.route as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
              <Ionicons name="arrow-forward" size={20} color={SalonColors.white} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Salons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Salons</Text>
            <TouchableOpacity onPress={() => router.push('/salon/categories' as any)}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredSalons.map((salon) => (
              <TouchableOpacity
                key={salon.id}
                style={styles.featuredCard}
                onPress={() => router.push('/salon/categories' as any)}
                activeOpacity={0.9}
              >
                <Image
                  source={salon.image}
                  style={styles.featuredImage}
                  contentFit="cover"
                />
                <View style={styles.featuredOverlay}>
                  <View style={styles.featuredBadge}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.featuredRating}>{salon.rating}</Text>
                  </View>
                </View>
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredName}>{salon.name}</Text>
                  <Text style={styles.featuredServices}>{salon.services}</Text>
                  <View style={styles.featuredFooter}>
                    <View style={styles.distanceContainer}>
                      <Ionicons name="location-outline" size={14} color={SalonColors.textSecondary} />
                      <Text style={styles.featuredDistance}>{salon.distance}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookNowButton}>
                      <Text style={styles.bookNowText}>Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity onPress={() => router.push('/salon/categories' as any)}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesGrid}>
            {popularServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => router.push('/salon/categories' as any)}
                activeOpacity={0.7}
              >
                <View style={styles.serviceIconContainer}>
                  <Text style={styles.serviceIcon}>{service.icon}</Text>
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promotional Banner */}
        <TouchableOpacity
          style={styles.promoBanner}
          onPress={() => router.push('/salon/categories' as any)}
          activeOpacity={0.9}
        >
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Special Offer! 🎉</Text>
            <Text style={styles.promoText}>Get 20% off on your first booking</Text>
            <View style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Book Now</Text>
            </View>
          </View>
          <View style={styles.promoIcon}>
            <Text style={styles.promoEmoji}>💝</Text>
          </View>
        </TouchableOpacity>

        {/* Why Choose Us */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="checkmark-circle" size={24} color={SalonColors.success} />
              </View>
              <Text style={styles.featureText}>Verified Salons</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="time-outline" size={24} color={SalonColors.primary} />
              </View>
              <Text style={styles.featureText}>Easy Booking</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="shield-checkmark" size={24} color={SalonColors.secondary} />
              </View>
              <Text style={styles.featureText}>Secure Payment</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="star" size={24} color={SalonColors.accent} />
              </View>
              <Text style={styles.featureText}>Top Rated</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SalonColors.background,
  },
  header: {
    backgroundColor: SalonColors.white,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 16 : 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 12,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  brandContainer: {
    flex: 1,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
  },
  brandTagline: {
    fontSize: 12,
    color: SalonColors.textSecondary,
    marginTop: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SalonColors.background,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: SalonColors.error,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: SalonColors.white,
  },
  badgeText: {
    color: SalonColors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  greetingSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: SalonColors.textSecondary,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  quickActionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: SalonColors.white,
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: SalonColors.primary,
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  featuredCard: {
    width: width * 0.7,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: SalonColors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 180,
    backgroundColor: SalonColors.surfaceLight,
  },
  featuredOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  featuredRating: {
    fontSize: 14,
    fontWeight: '600',
    color: SalonColors.textPrimary,
  },
  featuredInfo: {
    padding: 16,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
    marginBottom: 4,
  },
  featuredServices: {
    fontSize: 13,
    color: SalonColors.textSecondary,
    marginBottom: 12,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredDistance: {
    fontSize: 13,
    color: SalonColors.textSecondary,
  },
  bookNowButton: {
    backgroundColor: SalonColors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookNowText: {
    color: SalonColors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  serviceCard: {
    width: (width - 52) / 2,
    backgroundColor: SalonColors.white,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: SalonColors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    fontSize: 32,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SalonColors.primary,
  },
  promoBanner: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: SalonColors.primary,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: SalonColors.white,
    marginBottom: 4,
  },
  promoText: {
    fontSize: 14,
    color: SalonColors.white,
    opacity: 0.9,
    marginBottom: 12,
  },
  promoButton: {
    backgroundColor: SalonColors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: SalonColors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  promoIcon: {
    marginLeft: 12,
  },
  promoEmoji: {
    fontSize: 48,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  featureItem: {
    width: (width - 56) / 2,
    backgroundColor: SalonColors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  featureIcon: {
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100,
  },
});
