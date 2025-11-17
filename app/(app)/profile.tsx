import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SalonColors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john.doe@example.com',
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Navigate to login screen
            router.replace('/(auth)/login' as any);
          },
        },
      ]
    );
  };

  const menuItems = [
    { id: '1', title: 'Saved Addresses', icon: '📍', route: null },
    { id: '2', title: 'Payment Methods', icon: '💳', route: null },
    { id: '3', title: 'Notifications', icon: '🔔', route: null },
    { id: '4', title: 'Help & Support', icon: '❓', route: null },
    { id: '5', title: 'Terms & Conditions', icon: '📄', route: null },
    { id: '6', title: 'Privacy Policy', icon: '🔒', route: null },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile & Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.name.split(' ').map((n) => n[0]).join('')}
            </Text>
          </View>

          {isEditing ? (
            <View style={styles.form}>
              <Input
                label="Name"
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
              />
              <Input
                label="Phone"
                value={profile.phone}
                keyboardType="phone-pad"
                onChangeText={(text) => setProfile({ ...profile, phone: text })}
              />
              <Input
                label="Email"
                value={profile.email}
                keyboardType="email-address"
                onChangeText={(text) => setProfile({ ...profile, email: text })}
              />
              <View style={styles.editActions}>
                <Button
                  title="Cancel"
                  onPress={() => setIsEditing(false)}
                  variant="outline"
                  style={styles.editButton}
                />
                <Button
                  title="Save"
                  onPress={handleSave}
                  style={styles.editButton}
                />
              </View>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileDetail}>{profile.phone}</Text>
              <Text style={styles.profileDetail}>{profile.email}</Text>
              <Button
                title="Edit Profile"
                onPress={() => setIsEditing(true)}
                variant="outline"
                style={styles.editProfileButton}
              />
            </View>
          )}
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                if (item.route) {
                  router.push(item.route as any);
                } else {
                  Alert.alert('Coming Soon', `${item.title} feature coming soon!`);
                }
              }}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Card style={styles.aboutCard}>
            <Text style={styles.aboutText}>Version 1.0.0</Text>
            <Text style={styles.aboutText}>© 2025 Salon Booking App</Text>
          </Card>
        </View>

        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: SalonColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: SalonColors.white,
  },
  profileInfo: {
    alignItems: 'center',
    width: '100%',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SalonColors.textPrimary,
    marginBottom: 8,
  },
  profileDetail: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    marginBottom: 4,
  },
  editProfileButton: {
    marginTop: 16,
    width: '100%',
  },
  form: {
    width: '100%',
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  editButton: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: SalonColors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuTitle: {
    fontSize: 16,
    color: SalonColors.textPrimary,
  },
  menuArrow: {
    fontSize: 24,
    color: SalonColors.textLight,
    fontWeight: '300',
  },
  aboutCard: {
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    marginBottom: 4,
  },
  logoutButton: {
    marginBottom: 40,
  },
});
