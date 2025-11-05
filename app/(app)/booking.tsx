import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function BookingScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedService, setSelectedService] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(2);
  const [selectedBeautician, setSelectedBeautician] = useState(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const services = [
    { name: 'Hair Styling', duration: '60 min', price: '$45' },
    { name: 'Hair Coloring', duration: '120 min', price: '$85' },
    { name: 'Manicure', duration: '45 min', price: '$25' },
    { name: 'Pedicure', duration: '60 min', price: '$35' },
    { name: 'Facial Treatment', duration: '90 min', price: '$60' },
    { name: 'Massage Therapy', duration: '60 min', price: '$80' },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Book Appointment</ThemedText>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={28} color="#4E342E" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Service Selection */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Select Service</ThemedText>
          {services.map((service, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.serviceItem,
                selectedService === index && styles.selectedServiceItem
              ]}
              onPress={() => setSelectedService(index)}
            >
              <View style={styles.serviceInfo}>
                <ThemedText style={[
                  styles.serviceName,
                  selectedService === index && styles.selectedServiceText
                ]}>{service.name}</ThemedText>
                <ThemedText style={[
                  styles.serviceDuration,
                  selectedService === index && styles.selectedServiceSubtext
                ]}>{service.duration}</ThemedText>
              </View>
              <ThemedText style={[
                styles.servicePrice,
                selectedService === index && styles.selectedServiceText
              ]}>{service.price}</ThemedText>
              {selectedService === index && (
                <Ionicons name="checkmark-circle" size={24} color="#4E342E" style={styles.checkIcon} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Select Date</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...Array(7)].map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() + index);
              const dayName = date.toLocaleDateString('en', { weekday: 'short' });
              const dayNumber = date.getDate();
              
              return (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.dateCard, selectedDate === index && styles.selectedDate]}
                  onPress={() => setSelectedDate(index)}
                >
                  <ThemedText style={[styles.dayName, selectedDate === index && styles.selectedText]}>{dayName}</ThemedText>
                  <ThemedText style={[styles.dayNumber, selectedDate === index && styles.selectedText]}>{dayNumber}</ThemedText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Select Time</ThemedText>
          <View style={styles.timeGrid}>
            {timeSlots.map((time, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.timeSlot, selectedTime === index && styles.selectedTime]}
                onPress={() => setSelectedTime(index)}
              >
                <ThemedText style={[styles.timeText, selectedTime === index && styles.selectedTimeText]}>
                  {time}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Beautician Selection */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Choose Beautician</ThemedText>
          {['Sarah Johnson', 'Emma Davis', 'Lisa Wilson'].map((name, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.beauticianCard, selectedBeautician === index && styles.selectedBeautician]}
              onPress={() => setSelectedBeautician(index)}
            >
              <View style={styles.beauticianAvatar}>
                <Ionicons name="person" size={24} color="#4E342E" />
              </View>
              <View style={styles.beauticianInfo}>
                <ThemedText style={styles.beauticianName}>{name}</ThemedText>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <ThemedText style={styles.rating}>4.{9 - index}</ThemedText>
                </View>
              </View>
              {selectedBeautician === index && <Ionicons name="checkmark-circle" size={24} color="#4E342E" />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton}>
          <ThemedText style={styles.bookButtonText}>Confirm Booking - $45</ThemedText>
        </TouchableOpacity>
        
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E342E',
  },
  helpButton: {
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 15,
  },
  serviceItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedServiceItem: {
    borderColor: '#4E342E',
    backgroundColor: '#F8F6F4',
    shadowOpacity: 0.15,
  },
  selectedServiceText: {
    color: '#4E342E',
    fontWeight: 'bold',
  },
  selectedServiceSubtext: {
    color: '#4E342E',
    opacity: 0.8,
  },
  checkIcon: {
    marginLeft: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4E342E',
    marginBottom: 2,
  },
  serviceDuration: {
    fontSize: 14,
    color: '#4E342E',
    opacity: 0.7,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E342E',
  },
  dateCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 70,
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDate: {
    backgroundColor: '#4E342E',
    borderColor: '#4E342E',
    shadowOpacity: 0.2,
  },
  dayName: {
    fontSize: 12,
    color: '#4E342E',
    marginBottom: 5,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E342E',
  },
  selectedText: {
    color: '#fff',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTime: {
    backgroundColor: '#4E342E',
    borderColor: '#4E342E',
    shadowOpacity: 0.15,
  },
  timeText: {
    fontSize: 14,
    color: '#4E342E',
    fontWeight: '500',
  },
  selectedTimeText: {
    color: '#fff',
  },
  beauticianCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedBeautician: {
    borderWidth: 2,
    borderColor: '#4E342E',
  },
  beauticianAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3EFE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  beauticianInfo: {
    flex: 1,
  },
  beauticianName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4E342E',
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#4E342E',
    marginLeft: 5,
  },
  bookButton: {
    backgroundColor: '#4E342E',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomPadding: {
    height: 20,
  },
});