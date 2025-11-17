import { Card } from '@/components/ui/card';
import { SalonColors } from '@/constants/theme';
import { mockSalons } from '@/lib/mock-data';
import { Header } from '@react-navigation/elements';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SalonListScreen() {
  const router = useRouter();
  const { categories } = useLocalSearchParams();
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');

  const sortedSalons = [...mockSalons].sort((a, b) => {
    if (sortBy === 'distance') {
      return (a.distance || 0) - (b.distance || 0);
    }
    return b.rating - a.rating;
  });

  return (
    <View style={styles.container}>
      <Header title="Salons Near You" />
      <View style={styles.filterContainer}>
        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'distance' && styles.sortButtonActive]}
            onPress={() => setSortBy('distance')}
          >
            <Text style={[styles.sortText, sortBy === 'distance' && styles.sortTextActive]}>
              Nearest
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'rating' && styles.sortButtonActive]}
            onPress={() => setSortBy('rating')}
          >
            <Text style={[styles.sortText, sortBy === 'rating' && styles.sortTextActive]}>
              Top Rated
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {sortedSalons.map((salon) => (
          <TouchableOpacity
            key={salon.id}
            onPress={() => router.push({ pathname: '/(app)/salon/detail' as any, params: { id: salon.id } })}
            activeOpacity={0.7}
          >
            <Card style={styles.salonCard}>
              <Image source={{ uri: salon.image }} style={styles.salonImage} />
              <View style={styles.salonInfo}>
                <Text style={styles.salonName}>{salon.name}</Text>
                <Text style={styles.salonAddress}>{salon.address}</Text>
                <View style={styles.salonMeta}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>⭐</Text>
                    <Text style={styles.metaText}>
                      {salon.rating} ({salon.reviewCount})
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>📍</Text>
                    <Text style={styles.metaText}>{salon.distance} km</Text>
                  </View>
                </View>
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
  filterContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  sortContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: SalonColors.white,
    borderWidth: 1,
    borderColor: SalonColors.border,
  },
  sortButtonActive: {
    backgroundColor: SalonColors.primary,
    borderColor: SalonColors.primary,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '600',
    color: SalonColors.textSecondary,
  },
  sortTextActive: {
    color: SalonColors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  salonCard: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
  },
  salonImage: {
    width: '100%',
    height: 160,
    backgroundColor: SalonColors.surfaceLight,
  },
  salonInfo: {
    padding: 16,
  },
  salonName: {
    fontSize: 18,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 4,
  },
  salonAddress: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    marginBottom: 12,
  },
  salonMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaIcon: {
    fontSize: 14,
  },
  metaText: {
    fontSize: 14,
    color: SalonColors.textSecondary,
  },
});
