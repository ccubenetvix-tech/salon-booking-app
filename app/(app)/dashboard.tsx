import { Card } from '@/components/ui/card';
import { SalonColors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const router = useRouter();

  const menuItems = [
    {
      id: '1',
      title: 'Book Salon Appointment',
      description: 'Visit a salon near you',
      icon: '💇',
      color: SalonColors.primary,
      route: '/(app)/salon/categories',
    },
    {
      id: '2',
      title: 'Book At-Home Service',
      description: 'Get services at your doorstep',
      icon: '🏠',
      color: SalonColors.secondary,
      route: '/(app)/home-service/categories',
    },
    {
      id: '3',
      title: 'Booking History',
      description: 'View your past bookings',
      icon: '📋',
      color: SalonColors.accent,
      route: '/(app)/bookings',
    },
    {
      id: '4',
      title: 'Profile & Settings',
      description: 'Manage your account',
      icon: '⚙️',
      color: SalonColors.success,
      route: '/(app)/profile',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello! 👋</Text>
        <Text style={styles.title}>What would you like to do today?</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.7}
          >
            <Card style={styles.menuCard}>
              <View style={styles.menuContent}>
                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: SalonColors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  menuCard: {
    marginBottom: 16,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 28,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: SalonColors.textSecondary,
  },
  arrow: {
    fontSize: 32,
    color: SalonColors.textLight,
    fontWeight: '300',
  },
});
