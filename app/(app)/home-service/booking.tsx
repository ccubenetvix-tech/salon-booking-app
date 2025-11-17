import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SalonColors } from '@/constants/theme';
import { mockServices, mockTimeSlots } from '@/lib/mock-data';
import { Header } from '@react-navigation/elements';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeServiceBookingScreen() {
  const router = useRouter();
  const { categories, address } = useLocalSearchParams();
  const categoryIds = (categories as string).split(',');
  
  const availableServices = mockServices.filter((s) =>
    categoryIds.some((catId) => {
      const cat = ['Hair', 'Nails', 'Spa', 'Makeup', 'Skin', 'Waxing'][parseInt(catId) - 1];
      return s.category === cat;
    })
  );

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
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

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    return availableServices
      .filter((s) => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
  };

  const handleBooking = async () => {
    if (selectedServices.length === 0) {
      Alert.alert('Error', 'Please select at least one service');
      return;
    }
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select date and time');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: '/(app)/home-service/confirmation' as any,
        params: {
          services: selectedServices.join(','),
          address,
          date: selectedDate,
          time: selectedTime,
        },
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header title="Book At-Home Service" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        <Card style={styles.addressCard}>
          <Text style={styles.addressLabel}>Service Address</Text>
          <Text style={styles.addressText}>{address}</Text>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Services</Text>
          {availableServices.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <TouchableOpacity
                key={service.id}
                onPress={() => toggleService(service.id)}
                activeOpacity={0.7}
              >
                <Card style={isSelected ? [styles.serviceCard, styles.selectedService] : styles.serviceCard}>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.serviceDescription}>{service.description}</Text>
                    <Text style={styles.serviceDuration}>{service.duration} mins</Text>
                  </View>
                  <Text style={styles.servicePrice}>₹{service.price}</Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

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
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>₹{getTotalPrice()}</Text>
        </View>
        <Button
          title="Confirm Booking"
          onPress={handleBooking}
          loading={loading}
          disabled={selectedServices.length === 0 || !selectedDate || !selectedTime}
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
  addressCard: {
    marginBottom: 24,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: SalonColors.textSecondary,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    color: SalonColors.textPrimary,
    lineHeight: 22,
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
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedService: {
    borderWidth: 2,
    borderColor: SalonColors.secondary,
    backgroundColor: SalonColors.secondary + '10',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 12,
    color: SalonColors.textLight,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '600',
    color: SalonColors.secondary,
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
    backgroundColor: SalonColors.secondary,
    borderColor: SalonColors.secondary,
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
    backgroundColor: SalonColors.secondary,
    borderColor: SalonColors.secondary,
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
  footer: {
    padding: 24,
    backgroundColor: SalonColors.white,
    borderTopWidth: 1,
    borderTopColor: SalonColors.border,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: SalonColors.textSecondary,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
  },
});
