import { Card } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { SalonColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Notification {
  id: string;
  type: 'booking' | 'offer' | 'reminder' | 'update';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  color: string;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your appointment at Glamour Studio is confirmed for Nov 20, 10:00 AM',
      time: '2 hours ago',
      read: false,
      icon: 'checkmark-circle',
      color: SalonColors.success,
    },
    {
      id: '2',
      type: 'offer',
      title: 'Special Offer! 🎉',
      message: 'Get 20% off on your next booking. Use code: BEAUTY20',
      time: '5 hours ago',
      read: false,
      icon: 'gift',
      color: SalonColors.secondary,
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Appointment Reminder',
      message: 'Your appointment is tomorrow at 10:00 AM. Don\'t forget!',
      time: '1 day ago',
      read: true,
      icon: 'time',
      color: SalonColors.accent,
    },
    {
      id: '4',
      type: 'update',
      title: 'New Salon Added',
      message: 'Elite Salon & Spa is now available in your area. Check it out!',
      time: '2 days ago',
      read: true,
      icon: 'sparkles',
      color: SalonColors.primary,
    },
    {
      id: '5',
      type: 'booking',
      title: 'Booking Completed',
      message: 'Thank you for visiting Beauty Haven. Rate your experience!',
      time: '3 days ago',
      read: true,
      icon: 'star',
      color: SalonColors.accent,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIconName = (iconName: string): any => {
    return iconName as any;
  };

  return (
    <View style={styles.container}>
      <Header title="Notifications" />

      {/* Header Actions */}
      <View style={styles.headerActions}>
        <Text style={styles.unreadCount}>
          {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAllRead}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyText}>
              You're all caught up! We'll notify you when something new happens.
            </Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => markAsRead(notification.id)}
              activeOpacity={0.7}
            >
              <Card
                style={
                  !notification.read 
                    ? [styles.notificationCard, styles.unreadCard]
                    : styles.notificationCard
                }
              >
                <View style={styles.notificationContent}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: notification.color + '20' },
                    ]}
                  >
                    <Ionicons
                      name={getIconName(notification.icon)}
                      size={24}
                      color={notification.color}
                    />
                  </View>

                  <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                      <Text style={styles.notificationTitle}>
                        {notification.title}
                      </Text>
                      {!notification.read && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.time}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteNotification(notification.id)}
                  >
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color={SalonColors.textLight}
                    />
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SalonColors.background,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  unreadCount: {
    fontSize: 14,
    fontWeight: '600',
    color: SalonColors.textSecondary,
  },
  markAllRead: {
    fontSize: 14,
    fontWeight: '600',
    color: SalonColors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  notificationCard: {
    marginBottom: 12,
    padding: 0,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: SalonColors.primary,
  },
  notificationContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: SalonColors.primary,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: SalonColors.textSecondary,
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: SalonColors.textLight,
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  bottomPadding: {
    height: 120,
  },
});
