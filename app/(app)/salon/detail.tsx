import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SalonColors } from '@/constants/theme';
import { mockSalons } from '@/lib/mock-data';
import { Header } from '@react-navigation/elements';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SalonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const salon = mockSalons.find((s) => s.id === id);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  if (!salon) {
    return (
      <View style={styles.container}>
        <Text>Salon not found</Text>
      </View>
    );
  }

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    return salon.services
      .filter((s) => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
  };

  const handleContinue = () => {
    if (selectedServices.length > 0) {
      router.push({
        pathname: '/(app)/salon/booking' as any,
        params: {
          salonId: salon.id,
          services: selectedServices.join(','),
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Salon Details" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={salon.image} style={styles.headerImage} />
        
        <View style={styles.content}>
          <Text style={styles.salonName}>{salon.name}</Text>
          <Text style={styles.salonAddress}>{salon.address}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⭐</Text>
              <Text style={styles.metaText}>
                {salon.rating} ({salon.reviewCount} reviews)
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>{salon.distance} km away</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>🕐</Text>
              <Text style={styles.metaText}>{salon.openingHours}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Services</Text>
            {salon.services.map((service) => {
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
        </View>
      </ScrollView>

      {selectedServices.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>₹{getTotalPrice()}</Text>
          </View>
          <Button
            title="Continue to Booking"
            onPress={handleContinue}
            style={styles.continueButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SalonColors.background,
  },
  headerImage: {
    width: '100%',
    height: 250,
    backgroundColor: SalonColors.surfaceLight,
  },
  content: {
    padding: 24,
  },
  salonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
    marginBottom: 8,
  },
  salonAddress: {
    fontSize: 16,
    color: SalonColors.textSecondary,
    marginBottom: 16,
  },
  metaContainer: {
    gap: 8,
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaIcon: {
    fontSize: 16,
  },
  metaText: {
    fontSize: 14,
    color: SalonColors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
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
    borderColor: SalonColors.primary,
    backgroundColor: SalonColors.primary + '10',
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
    color: SalonColors.primary,
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
  continueButton: {
    width: '100%',
  },
});
