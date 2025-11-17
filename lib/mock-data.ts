// Mock data for the salon booking app
import { Booking, Salon, Service, ServiceCategory, TimeSlot } from '@/types/booking';

export const serviceCategories: ServiceCategory[] = [
  { id: '1', name: 'Hair', icon: '✂️', description: 'Haircut, styling, coloring' },
  { id: '2', name: 'Nails', icon: '💅', description: 'Manicure, pedicure, nail art' },
  { id: '3', name: 'Spa', icon: '🧖', description: 'Massage, facial, body treatments' },
  { id: '4', name: 'Makeup', icon: '💄', description: 'Bridal, party, everyday makeup' },
  { id: '5', name: 'Skin', icon: '✨', description: 'Facial, cleanup, treatments' },
  { id: '6', name: 'Waxing', icon: '🪒', description: 'Full body, face, arms & legs' },
];

export const mockServices: Service[] = [
  { id: '1', name: 'Haircut', category: 'Hair', duration: 45, price: 500, description: 'Professional haircut' },
  { id: '2', name: 'Hair Coloring', category: 'Hair', duration: 120, price: 2500, description: 'Full hair coloring' },
  { id: '3', name: 'Manicure', category: 'Nails', duration: 30, price: 400, description: 'Basic manicure' },
  { id: '4', name: 'Pedicure', category: 'Nails', duration: 45, price: 600, description: 'Relaxing pedicure' },
  { id: '5', name: 'Facial', category: 'Spa', duration: 60, price: 1500, description: 'Deep cleansing facial' },
  { id: '6', name: 'Body Massage', category: 'Spa', duration: 90, price: 2000, description: 'Full body massage' },
];

export const mockSalons: Salon[] = [
  {
    id: '1',
    name: 'Glamour Studio',
    address: '123 Main Street, Downtown',
    distance: 2.5,
    rating: 4.8,
    reviewCount: 245,
    image: require('@/assets/images/salon1.jpg'),
    services: mockServices.slice(0, 4),
    openingHours: '9:00 AM - 8:00 PM',
  },
  {
    id: '2',
    name: 'Beauty Haven',
    address: '456 Park Avenue, Central',
    distance: 3.2,
    rating: 4.6,
    reviewCount: 189,
    image: require('@/assets/images/salon2.jpg'),
    services: mockServices.slice(2, 6),
    openingHours: '10:00 AM - 9:00 PM',
  },
  {
    id: '3',
    name: 'Elite Salon & Spa',
    address: '789 Oak Road, Westside',
    distance: 4.1,
    rating: 4.9,
    reviewCount: 312,
    image: require('@/assets/images/salon1.jpg'),
    services: mockServices,
    openingHours: '8:00 AM - 10:00 PM',
  },
];

export const mockTimeSlots: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '01:00 PM', available: true },
  { time: '02:00 PM', available: false },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: true },
  { time: '05:00 PM', available: true },
  { time: '06:00 PM', available: false },
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    type: 'salon',
    salon: mockSalons[0],
    services: [mockServices[0], mockServices[2]],
    date: '2025-11-20',
    time: '10:00 AM',
    status: 'upcoming',
    totalPrice: 900,
  },
  {
    id: '2',
    type: 'home',
    services: [mockServices[4]],
    date: '2025-11-15',
    time: '02:00 PM',
    address: '123 Home Street, Apt 4B',
    status: 'completed',
    totalPrice: 1500,
  },
];
