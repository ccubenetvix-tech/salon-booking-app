import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SalonColors } from '@/constants/theme';
import { mockSalons, mockTimeSlots } from '@/lib/mock-data';
import { Header } from '@react-navigation/elements';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SalonBookingScreen() {
  const router = useRouter();
  const { salonId, services } = useLocalSearchParams();
  const salon = mockSalons.find((s) => s.id === salonId);
  const serviceIds = (services as string).split(',');
  const selectedServices = salon?.services.filter((s) => serviceIds.includes(s.id)) || [];

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: date.getDate(),
    };
  });

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select date and time');
      return;
    }

    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: '/(app)/salon/confirmation' as any,
        params: {
          salonId,
          services,
          date: selectedDate,
          time: selectedTime,
        },
      });
    }, 1000);
  };

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <View style={styles.container}>
      <Header title="Select Date & Time" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.dateContainer}>
              {dates.map((date) => (
                <TouchableOpacity
                  key={date.date}
                  style={[
                    styles.dateCard,
                    selectedDate === date.date && styles.selectedDate,
                  ]}
                  onPress={() => setSelectedDate(date.date)}
                >
                  <Text
                    style={[
                      styles.dateDay,
                      selectedDate === date.date && styles.selectedDateText,
                    ]}
                  >
                    {date.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateDayNum,
                      selectedDate === date.date && styles.selectedDateText,
                    ]}
                  >
                    {date.dayNum}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {mockTimeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.time}
                style={[
                  styles.timeSlot,
                  !slot.available && styles.timeSlotDisabled,
                  selectedTime === slot.time && styles.selectedTime,
                ]}
                onPress={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
              >
                <Text
                  style={[
                    styles.timeText,
                    !slot.available && styles.timeTextDisabled,
                    selectedTime === slot.time && styles.selectedTimeText,
                  ]}
                >
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Salon</Text>
            <Text style={styles.summaryValue}>{salon?.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Services</Text>
            <Text style={styles.summaryValue}>
              {selectedServices.map((s) => s.name).join(', ')}
            </Text>
          </View>
          {selectedDate && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>{selectedDate}</Text>
            </View>
          )}
          {selectedTime && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time</Text>
              <Text style={styles.summaryValue}>{selectedTime}</Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{totalPrice}</Text>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Confirm Booking"
          onPress={handleBooking}
          loading={loading}
          disabled={!selectedDate || !selectedTime}
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
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateCard: {
    width: 70,
    paddingVertical: 16,
    backgroundColor: SalonColors.white,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: SalonColors.border,
  },
  selectedDate: {
    backgroundColor: SalonColors.primary,
    borderColor: SalonColors.primary,
  },
  dateDay: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    marginBottom: 4,
  },
  dateDayNum: {
    fontSize: 20,
    fontWeight: '600',
    color: SalonColors.textPrimary,
  },
  selectedDateText: {
    color: SalonColors.white,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: SalonColors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: SalonColors.border,
  },
  timeSlotDisabled: {
    opacity: 0.4,
  },
  selectedTime: {
    backgroundColor: SalonColors.primary,
    borderColor: SalonColors.primary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: SalonColors.textPrimary,
  },
  timeTextDisabled: {
    color: SalonColors.textLight,
  },
  selectedTimeText: {
    color: SalonColors.white,
  },
  summaryCard: {
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    flex: 1,
  },
  summaryValue: {
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
  footer: {
    padding: 24,
    backgroundColor: SalonColors.white,
    borderTopWidth: 1,
    borderTopColor: SalonColors.border,
  },
});
