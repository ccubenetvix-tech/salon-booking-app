# Salon Booking App

A complete React Native mobile application for salon booking built with Expo, featuring both salon visits and at-home beauty services.

## 🎨 Features

- **OTP-based Authentication** - Secure phone number login with OTP verification
- **Salon Booking** - Browse salons, select services, and book appointments
- **At-Home Services** - Book beauty services at your doorstep
- **Booking Management** - View, cancel, and reschedule appointments
- **User Profile** - Manage personal information and settings

## 📱 Screens Implemented

### Authentication Flow
- Splash Screen with app branding
- Onboarding (3 slides with skip option)
- Phone number login
- OTP verification (6-digit input)

### Main Features
- Dashboard with 4 main options
- Service category selection (Hair, Nails, Spa, Makeup, Skin, Waxing)
- Salon list with sorting (distance/rating)
- Salon details with service selection
- Date and time slot booking
- Booking confirmation
- Address management for at-home services
- Booking history (upcoming/completed)
- User profile and settings

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 📂 Project Structure

```
salon-booking-app/
├── app/                          # Expo Router screens
│   ├── index.tsx                 # Splash screen
│   ├── _layout.tsx               # Root navigation
│   ├── (auth)/                   # Authentication screens
│   │   ├── login.tsx
│   │   └── verify-otp.tsx
│   └── (app)/                    # Main app screens
│       ├── onboarding.tsx
│       ├── dashboard.tsx
│       ├── bookings.tsx
│       ├── profile.tsx
│       ├── salon/                # Salon booking flow
│       │   ├── categories.tsx
│       │   ├── list.tsx
│       │   ├── detail.tsx
│       │   ├── booking.tsx
│       │   └── confirmation.tsx
│       └── home-service/         # At-home service flow
│           ├── categories.tsx
│           ├── address.tsx
│           ├── booking.tsx
│           └── confirmation.tsx
├── components/
│   └── ui/                       # Reusable UI components
│       ├── button.tsx
│       ├── input.tsx
│       └── card.tsx
├── constants/
│   └── theme.ts                  # App colors and theme
├── types/
│   └── booking.ts                # TypeScript definitions
└── lib/
    └── mock-data.ts              # Mock data for development
```

## 🎨 Design System

### Colors
- **Primary**: Purple (#8B5CF6) - Main actions, salon bookings
- **Secondary**: Pink (#EC4899) - At-home services
- **Accent**: Amber (#F59E0B) - Highlights
- **Success**: Green (#10B981) - Confirmations
- **Error**: Red (#EF4444) - Error states

### Components
- **Button**: 3 variants (primary, secondary, outline) with loading states
- **Input**: Text input with label and error display
- **Card**: Elevated container with shadow

## 🧪 Testing

All screens use mock data and can be tested without a backend:

- **Phone Login**: Any 10-digit number works
- **OTP**: Any 6 digits work
- **Bookings**: Mock salons and services are pre-loaded

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed testing instructions.

## 📖 Documentation

- [SALON_APP_GUIDE.md](./SALON_APP_GUIDE.md) - Complete feature documentation
- [NAVIGATION_FLOW.md](./NAVIGATION_FLOW.md) - Navigation structure and flows
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testing instructions and checklist

## 🔧 Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Expo Router** - File-based routing
- **TypeScript** - Type safety
- **React Hooks** - State management

## 📦 Dependencies

Key dependencies include:
- `expo` - Expo SDK
- `expo-router` - File-based navigation
- `react-native` - React Native framework
- `@react-navigation/native` - Navigation library
- `typescript` - TypeScript support

## 🔄 Next Steps for Production

### Backend Integration
1. Replace mock data with real API calls
2. Implement proper authentication with JWT tokens
3. Add data persistence with AsyncStorage or database
4. Integrate payment gateway (Stripe, Razorpay)
5. Add push notifications
6. Implement real-time booking updates

### Features to Add
1. Search and filters for salons
2. Reviews and ratings system
3. Favorite salons
4. Promotional offers and discounts
5. Loyalty program
6. Chat with salon
7. Photo gallery for salons
8. Service provider profiles

### Technical Improvements
1. Add unit tests (Jest)
2. Add E2E tests (Detox)
3. Implement proper error handling
4. Add analytics (Firebase, Mixpanel)
5. Optimize images and performance
6. Add offline support
7. Implement deep linking
8. Add accessibility features

## 📝 License

This project is for demonstration purposes.

## 👥 Contributing

This is a complete implementation ready for backend integration. All screens are functional with mock data.

## 🐛 Known Limitations

- Mock data only (no real API)
- No data persistence
- No real payment processing
- No push notifications
- No real-time updates
- Images are placeholder URLs

## 📞 Support

For questions or issues, please refer to the documentation files included in this project.

---

Built with ❤️ using React Native and Expo
