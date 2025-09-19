// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  points: number;
  level: number;
}

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  location?: string;
}

// Community Types
export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  images?: string[];
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  content: string;
  images?: string[];
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentRequest {
  postId: string;
  content: string;
}

// Store Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Maps Types
export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  type: 'park' | 'garden' | 'conservation' | 'renewable_energy' | 'other';
  description: string;
  images: string[];
  rating: number;
  isVerified: boolean;
  createdAt: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  airQuality: {
    aqi: number;
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
  timestamp: string;
}

export interface EnvironmentData {
  airQuality: number;
  waterQuality: number;
  soilQuality: number;
  biodiversity: number;
  carbonFootprint: number;
  renewableEnergy: number;
  wasteManagement: number;
  timestamp: string;
}

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: 'environment' | 'community' | 'shopping' | 'exploration';
  requirements: AchievementRequirement[];
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface AchievementRequirement {
  type: 'posts' | 'likes' | 'comments' | 'purchases' | 'locations' | 'points';
  target: number;
  current: number;
}

// Error Types
export interface ApiError {
  message: string;
  code: string;
  details?: any;
}
