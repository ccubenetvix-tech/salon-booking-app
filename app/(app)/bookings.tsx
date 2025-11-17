import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SalonColors } from '@/constants/theme';
import { mockBookings } from '@/lib/mock-data';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [bookings, setBookings] = useState(mockBookings);

  const filteredBookings = bookings.filter((b) =>
    activeTab === 'upcoming' ? b.status === 'upcoming' : b.status === 'completed'
  );

  const handleCancel = (bookingId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            setBookings((prev) =>
              prev.map((b) =>
                b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
              )
            );
            Alert.alert('Success', 'Booking cancelled successfully');
          },
        },
      ]
    );
  };

  const handleReschedule = (bookingId: string) => {
    Alert.alert('Reschedule', 'Reschedule functionality coming soon!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyTitle}>No {activeTab} bookings</Text>
            <Text style={styles.emptyText}>
              {activeTab === 'upcoming'
                ? 'Book a service to see it here'
                : 'Your completed bookings will appear here'}
            </Text>
          </View>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View>
                  <Text style={styles.bookingType}>
                    {booking.type === 'salon' ? '💇 Salon Visit' : '🏠 At-Home Service'}
                  </Text>
                  <Text style={styles.bookingId}>#{booking.id}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    booking.status === 'upcoming' && styles.upcomingBadge,
                    booking.status === 'completed' && styles.completedBadge,
                  ]}
                >
                  <Text style={styles.statusText}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Text>
                </View>
              </View>

              {booking.salon && (
                <Text style={styles.salonName}>{booking.salon.name}</Text>
              )}
              {booking.address && (
                <Text style={styles.address}>{booking.address}</Text>
              )}

              <View style={styles.bookingDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>📅</Text>
                  <Text style={styles.detailText}>{booking.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>🕐</Text>
                  <Text style={styles.detailText}>{booking.time}</Text>
                </View>
              </View>

              <View style={styles.servicesContainer}>
                <Text style={styles.servicesLabel}>Services:</Text>
                <Text style={styles.servicesText}>
                  {booking.services.map((s) => s.name).join(', ')}
                </Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Total</Text>
                <Text style={styles.priceValue}>₹{booking.totalPrice}</Text>
              </View>

              {booking.status === 'upcoming' && (
                <View style={styles.actions}>
                  <Button
                    title="Reschedule"
                    onPress={() => handleReschedule(booking.id)}
                    variant="outline"
                    style={styles.actionButton}
                  />
                  <Button
                    title="Cancel"
                    onPress={() => handleCancel(booking.id)}
                    variant="outline"
                    style={styles.actionButton}
                  />
                </View>
              )}
            </Card>
          ))
        )}
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
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: SalonColors.white,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: SalonColors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: SalonColors.textSecondary,
  },
  activeTabText: {
    color: SalonColors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    textAlign: 'center',
  },
  bookingCard: {
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingType: {
    fontSize: 16,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 4,
  },
  bookingId: {
    fontSize: 12,
    color: SalonColors.textLight,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  upcomingBadge: {
    backgroundColor: SalonColors.primary + '20',
  },
  completedBadge: {
    backgroundColor: SalonColors.success + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: SalonColors.textPrimary,
  },
  salonName: {
    fontSize: 16,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    marginBottom: 12,
  },
  bookingDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailIcon: {
    fontSize: 14,
  },
  detailText: {
    fontSize: 14,
    color: SalonColors.textSecondary,
  },
  servicesContainer: {
    marginBottom: 12,
  },
  servicesLabel: {
    fontSize: 12,
    color: SalonColors.textLight,
    marginBottom: 4,
  },
  servicesText: {
    fontSize: 14,
    color: SalonColors.textPrimary,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: SalonColors.border,
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: SalonColors.textSecondary,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SalonColors.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
