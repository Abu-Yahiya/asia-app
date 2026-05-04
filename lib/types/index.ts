/**
 * Travel Agency Type Definitions
 * Centralized types for consistency across the application
 */

export interface Destination {
  _id: string;
  name: string;
  country: string;
  description: string;
  images: string[];
  highlights: string[];
  bestTimeToVisit: string;
  averageTemperature: string;
  timezone: string;
  currency: string;
  language: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TravelPackage {
  _id: string;
  name: string;
  description: string;
  destination: string | Destination;
  price: number;
  discountedPrice?: number;
  duration: number;
  images: string[];
  inclusions: string[];
  exclusions: string[];
  maxGroupSize: number;
  minGroupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  availableDates: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  user: string | User;
  travelPackage: string | TravelPackage;
  destination: string | Destination;
  numberOfTravelers: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  bookingDate: string;
  departureDate: string;
  returnDate: string;
  specialRequests?: string;
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  user: string | User;
  destination?: string | Destination;
  travelPackage?: string | TravelPackage;
  rating: number;
  title: string;
  content: string;
  images: string[];
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  skip: number;
  limit: number;
  pages: number;
}

export interface ApiResponse<T = null> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}
