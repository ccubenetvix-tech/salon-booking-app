import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function MapsScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const nearbyLocations = [
    {
      id: 1,
      name: 'Beauty Salon Downtown',
      address: '123 Main Street, Downtown',
      distance: '0.5 km',
      rating: 4.8,
      services: ['Hair', 'Nails', 'Facial'],
    },
    {
      id: 2,
      name: 'Glamour Studio',
      address: '456 Oak Avenue, Midtown',
      distance: '1.2 km',
      rating: 4.9,
      services: ['Hair', 'Massage', 'Skincare'],
    },
    {
      id: 3,
      name: 'Elegant Beauty Center',
      address: '789 Pine Road, Uptown',
      distance: '2.1 km',
      rating: 4.7,
      services: ['Full Service', 'Spa', 'Wellness'],
    },
    {
      id: 4,
      name: 'Luxury Spa & Salon',
      address: '321 Elm Street, West Side',
      distance: '2.8 km',
      rating: 4.9,
      services: ['Premium Spa', 'Hair', 'Beauty'],
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Nearby Salons</ThemedText>
        <TouchableOpacity style={styles.mapButton}>
          <Ionicons name="map" size={24} color="#4E342E" />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <ThemedText style={styles.searchText}>Search location...</ThemedText>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color="#4E342E" />
        </TouchableOpacity>
      </View>

      {/* Map Placeholder */}
      <Animated.View 
        style={[
          styles.mapPlaceholder,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.mapIconContainer}>
          <Ionicons name="map-outline" size={60} color="#4E342E" />
          <View style={styles.pulseIndicator} />
        </View>
        <ThemedText style={styles.mapText}>Interactive Map View</ThemedText>
        <ThemedText style={styles.mapSubtext}>Tap to view full map with directions</ThemedText>
        <TouchableOpacity style={styles.viewMapButton}>
          <ThemedText style={styles.viewMapText}>Open Map</ThemedText>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Nearby Locations List */}
      <ScrollView style={styles.locationsList} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.sectionTitle}>Nearby Locations</ThemedText>
        
        {nearbyLocations.map((location) => (
          <TouchableOpacity key={location.id} style={styles.locationCard}>
            <View style={styles.locationInfo}>
              <View style={styles.locationHeader}>
                <ThemedText style={styles.locationName}>{location.name}</ThemedText>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <ThemedText style={styles.rating}>{location.rating}</ThemedText>
                </View>
              </View>
              
              <View style={styles.addressContainer}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <ThemedText style={styles.address}>{location.address}</ThemedText>
              </View>
              
              <View style={styles.distanceContainer}>
                <Ionicons name="walk-outline" size={16} color="#4E342E" />
                <ThemedText style={styles.distance}>{location.distance} away</ThemedText>
              </View>
              
              <View style={styles.servicesContainer}>
                {location.services.map((service, index) => (
                  <View key={index} style={styles.serviceTag}>
                    <ThemedText style={styles.serviceText}>{service}</ThemedText>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.locationActions}>
              <TouchableOpacity style={styles.directionsButton}>
                <Ionicons name="navigate" size={20} color="#4E342E" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.callButton}>
                <Ionicons name="call" size={20} color="#4E342E" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4E342E',
  },
  mapButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#999',
  },
  filterButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mapPlaceholder: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(78, 52, 46, 0.05)',
  },
  mapIconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  pulseIndicator: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  viewMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4E342E',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
    gap: 8,
  },
  viewMapText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  mapText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4E342E',
  },
  mapSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  locationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 15,
  },
  locationCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#4E342E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(78, 52, 46, 0.03)',
  },
  locationInfo: {
    flex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E342E',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#4E342E',
    marginLeft: 4,
    fontWeight: '600',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  distance: {
    fontSize: 14,
    color: '#4E342E',
    marginLeft: 8,
    fontWeight: '500',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  serviceTag: {
    backgroundColor: '#F3EFE9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceText: {
    fontSize: 12,
    color: '#4E342E',
    fontWeight: '500',
  },
  locationActions: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  directionsButton: {
    backgroundColor: '#F3EFE9',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  callButton: {
    backgroundColor: '#F3EFE9',
    padding: 10,
    borderRadius: 20,
  },
});