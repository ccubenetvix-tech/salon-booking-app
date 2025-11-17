import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SalonColors } from '@/constants/theme';
import { Header } from '@react-navigation/elements';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const savedAddresses = [
  { id: '1', label: 'Home', address: '123 Main Street, Apt 4B, Downtown, City - 400001' },
  { id: '2', label: 'Work', address: '456 Business Park, Floor 3, Central, City - 400002' },
];

export default function AddressSelectionScreen() {
  const router = useRouter();
  const { categories } = useLocalSearchParams();
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    city: '',
    pincode: '',
  });

  const handleContinue = () => {
    if (!selectedAddress && !showNewAddress) {
      Alert.alert('Error', 'Please select or add an address');
      return;
    }

    if (showNewAddress) {
      if (!newAddress.street || !newAddress.city || !newAddress.pincode) {
        Alert.alert('Error', 'Please fill all address fields');
        return;
      }
    }

    router.push({
      pathname: '/(app)/home-service/booking' as any,
      params: {
        categories,
        address: selectedAddress || `${newAddress.street}, ${newAddress.city} - ${newAddress.pincode}`,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Select Address" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Where should we provide the service?</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          {savedAddresses.map((addr) => (
            <TouchableOpacity
              key={addr.id}
              onPress={() => {
                setSelectedAddress(addr.address);
                setShowNewAddress(false);
              }}
              activeOpacity={0.7}
            >
              <Card
                style={selectedAddress === addr.address ? [styles.addressCard, styles.selectedAddress] : styles.addressCard}
              >
                <View style={styles.addressHeader}>
                  <Text style={styles.addressLabel}>{addr.label}</Text>
                  {selectedAddress === addr.address && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={styles.addressText}>{addr.address}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.addNewButton}
          onPress={() => {
            setShowNewAddress(!showNewAddress);
            setSelectedAddress('');
          }}
        >
          <Text style={styles.addNewText}>
            {showNewAddress ? '- Cancel' : '+ Add New Address'}
          </Text>
        </TouchableOpacity>

        {showNewAddress && (
          <View style={styles.newAddressForm}>
            <Input
              label="Label (e.g., Home, Work)"
              placeholder="Enter label"
              value={newAddress.label}
              onChangeText={(text) => setNewAddress({ ...newAddress, label: text })}
            />
            <Input
              label="Street Address"
              placeholder="Enter street address"
              value={newAddress.street}
              onChangeText={(text) => setNewAddress({ ...newAddress, street: text })}
              multiline
            />
            <Input
              label="City"
              placeholder="Enter city"
              value={newAddress.city}
              onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
            />
            <Input
              label="Pincode"
              placeholder="Enter pincode"
              keyboardType="number-pad"
              maxLength={6}
              value={newAddress.pincode}
              onChangeText={(text) => setNewAddress({ ...newAddress, pincode: text })}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedAddress && !showNewAddress}
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
  subtitle: {
    fontSize: 15,
    color: SalonColors.textSecondary,
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 16,
  },
  addressCard: {
    marginBottom: 12,
  },
  selectedAddress: {
    borderWidth: 2,
    borderColor: SalonColors.secondary,
    backgroundColor: SalonColors.secondary + '10',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: SalonColors.textPrimary,
  },
  checkmark: {
    fontSize: 20,
    color: SalonColors.secondary,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    lineHeight: 20,
  },
  addNewButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  addNewText: {
    fontSize: 16,
    fontWeight: '600',
    color: SalonColors.secondary,
  },
  newAddressForm: {
    marginTop: 16,
  },
  footer: {
    padding: 24,
    backgroundColor: SalonColors.white,
    borderTopWidth: 1,
    borderTopColor: SalonColors.border,
  },
});
