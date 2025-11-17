// Type definitions for the salon booking app

export interface Service {
  id: string;
  name: string;
  category: string;
  duration: number; // in minutes
  price: number;
  description?: string;
}

export interface Salon {
  id: string;
  name: string;
  address: string;
  distance?: number; // in km
  rating: number;
  reviewCount: number;
  image: any; // Can be string URL or require() image
  services: Service[];
  photos?: string[];
  openingHours?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Booking {
  id: string;
  type: 'salon' | 'home';
  salon?: Salon;
  services: Service[];
  date: string;
  time: string;
  address?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  totalPrice: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}
