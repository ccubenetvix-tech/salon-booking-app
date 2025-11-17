import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SalonColors } from '@/constants/theme';
import { mockSalons } from '@/lib/mock-data';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const { salonId, services, date, time } = useLocalSearchParams();
  const salon = mockSalons.find((s) => s.id === salonId);
  const serviceIds = (services as string).split(',');
  const selectedServices = salon?.services.filter((s) => serviceIds.includes(s.id)) || [];
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your appointment has been successfully booked</Text>

        <Card style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Booking ID</Text>
            <Text style={styles.detailValue}>#BK{Date.now().toString().slice(-6)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Salon</Text>
            <Text style={styles.detailValue}>{salon?.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailValue}>{salon?.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Services</Text>
            <Text style={styles.detailValue}>
              {selectedServices.map((s) => s.name).join(', ')}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{time}</Text>
          </View>
          <View style={[styles.detailRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{totalPrice}</Text>
          </View>
        </Card>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            A confirmation has been sent to your phone. Please arrive 10 minutes before your appointment.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="View Bookings"
          onPress={() => router.push('/(app)/bookings' as any)}
          style={styles.button}
        />
        <Button
          title="Back to Home"
          onPress={() => router.push('/(app)/dashboard' as any)}
          variant="outline"
          style={styles.button}
        />
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
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: SalonColors.success,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 48,
    color: SalonColors.white,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: SalonColors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  detailsCard: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: SalonColors.textPrimary,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: SalonColors.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: SalonColors.textPrimary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: SalonColors.primary,
  },
  infoBox: {
    backgroundColor: SalonColors.primary + '15',
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    gap: 12,
  },
  button: {
    width: '100%',
  },
});
