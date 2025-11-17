import { SalonColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppLayout() {
  const insets = useSafeAreaInsets();
  
  // Calculate dynamic height based on safe area with extra margin
  const tabBarHeight = Platform.OS === 'ios' 
    ? 85 + insets.bottom 
    : 90;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: SalonColors.white,
          borderTopWidth: 0,
          height: tabBarHeight,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom + 12 : 28,
          paddingTop: 14,
          paddingHorizontal: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -8,
          },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 24,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarActiveTintColor: SalonColors.primary,
        tabBarInactiveTintColor: SalonColors.textLight,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 5,
          marginBottom: 6,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 10,
          paddingHorizontal: 4,
          borderRadius: 12,
          marginHorizontal: 4,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={28} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'calendar' : 'calendar-outline'} 
              size={28} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              size={28} 
              color={color} 
            />
          ),
        }}
      />
      {/* Hidden screens - not shown in tab bar */}
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="onboarding"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="salon"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="home-service"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
