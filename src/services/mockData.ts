import type {
    Achievement,
    AuthResponse,
    Category,
    Comment,
    EnvironmentData,
    Location,
    Post,
    Product,
    User,
    WeatherData,
} from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Yêu thiên nhiên và bảo vệ môi trường',
    location: 'Hà Nội, Việt Nam',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isVerified: true,
    points: 1250,
    level: 5,
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Nhà hoạt động môi trường',
    location: 'TP.HCM, Việt Nam',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    isVerified: true,
    points: 890,
    level: 3,
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    user: {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      avatar: 'https://via.placeholder.com/150',
      bio: 'Yêu thiên nhiên và bảo vệ môi trường',
      location: 'Hà Nội, Việt Nam',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
      isVerified: true,
      points: 1250,
      level: 5,
    },
    content: 'Hôm nay tôi đã tham gia hoạt động dọn rác tại công viên. Cảm thấy rất vui khi góp phần bảo vệ môi trường! 🌱',
    images: ['https://via.placeholder.com/400x300'],
    location: {
      latitude: 21.0285,
      longitude: 105.8542,
      address: 'Công viên Thống Nhất, Hà Nội',
    },
    likesCount: 15,
    commentsCount: 3,
    isLiked: false,
    createdAt: '2024-01-25T10:30:00Z',
    updatedAt: '2024-01-25T10:30:00Z',
  },
  {
    id: '2',
    userId: '2',
    user: {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      avatar: 'https://via.placeholder.com/150',
      bio: 'Nhà hoạt động môi trường',
      location: 'TP.HCM, Việt Nam',
      createdAt: '2024-01-20T00:00:00Z',
      updatedAt: '2024-01-20T00:00:00Z',
      isVerified: true,
      points: 890,
      level: 3,
    },
    content: 'Chia sẻ một số mẹo tiết kiệm năng lượng tại nhà. Cùng nhau bảo vệ hành tinh! 💡',
    images: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'],
    location: {
      latitude: 10.8231,
      longitude: 106.6297,
      address: 'Quận 1, TP.HCM',
    },
    likesCount: 28,
    commentsCount: 7,
    isLiked: true,
    createdAt: '2024-01-24T14:20:00Z',
    updatedAt: '2024-01-24T14:20:00Z',
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    userId: '2',
    user: {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      avatar: 'https://via.placeholder.com/150',
      bio: 'Nhà hoạt động môi trường',
      location: 'TP.HCM, Việt Nam',
      createdAt: '2024-01-20T00:00:00Z',
      updatedAt: '2024-01-20T00:00:00Z',
      isVerified: true,
      points: 890,
      level: 3,
    },
    content: 'Tuyệt vời! Cảm ơn bạn đã góp phần bảo vệ môi trường! 👏',
    createdAt: '2024-01-25T11:00:00Z',
    updatedAt: '2024-01-25T11:00:00Z',
  },
  {
    id: '2',
    postId: '1',
    userId: '1',
    user: {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      avatar: 'https://via.placeholder.com/150',
      bio: 'Yêu thiên nhiên và bảo vệ môi trường',
      location: 'Hà Nội, Việt Nam',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
      isVerified: true,
      points: 1250,
      level: 5,
    },
    content: 'Cảm ơn bạn! Cùng nhau làm cho thế giới tốt đẹp hơn! 🌍',
    createdAt: '2024-01-25T11:15:00Z',
    updatedAt: '2024-01-25T11:15:00Z',
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Túi vải thân thiện môi trường',
    description: 'Túi vải cotton 100% tự nhiên, có thể tái sử dụng nhiều lần',
    price: 45000,
    images: ['https://via.placeholder.com/400x400'],
    category: 'eco-bags',
    stock: 50,
    rating: 4.8,
    reviewsCount: 25,
    isAvailable: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Bình nước inox không gỉ',
    description: 'Bình nước inox 304, thay thế chai nhựa dùng một lần',
    price: 120000,
    images: ['https://via.placeholder.com/400x400'],
    category: 'eco-bottles',
    stock: 30,
    rating: 4.9,
    reviewsCount: 18,
    isAvailable: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Ống hút tre tự nhiên',
    description: 'Ống hút tre 100% tự nhiên, có thể phân hủy sinh học',
    price: 25000,
    images: ['https://via.placeholder.com/400x400'],
    category: 'eco-straws',
    stock: 100,
    rating: 4.7,
    reviewsCount: 32,
    isAvailable: true,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Túi thân thiện môi trường',
    description: 'Các loại túi có thể tái sử dụng',
    icon: '👜',
    productCount: 5,
  },
  {
    id: '2',
    name: 'Bình nước',
    description: 'Bình nước thay thế chai nhựa',
    icon: '🍶',
    productCount: 8,
  },
  {
    id: '3',
    name: 'Ống hút',
    description: 'Ống hút thân thiện môi trường',
    icon: '🥤',
    productCount: 12,
  },
];

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Công viên Thống Nhất',
    latitude: 21.0285,
    longitude: 105.8542,
    address: 'Đống Đa, Hà Nội',
    type: 'park',
    description: 'Công viên lớn nhất Hà Nội với nhiều cây xanh và không gian mở',
    images: ['https://via.placeholder.com/400x300'],
    rating: 4.5,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Khu bảo tồn thiên nhiên Cát Tiên',
    latitude: 11.4167,
    longitude: 107.4167,
    address: 'Tân Phú, Đồng Nai',
    type: 'conservation',
    description: 'Khu bảo tồn thiên nhiên với hệ sinh thái đa dạng',
    images: ['https://via.placeholder.com/400x300'],
    rating: 4.8,
    isVerified: true,
    createdAt: '2024-01-02T00:00:00Z',
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Người mới bắt đầu',
    description: 'Tạo tài khoản và hoàn thành hồ sơ',
    icon: '🌱',
    points: 50,
    category: 'community',
    requirements: [
      {
        type: 'posts',
        target: 1,
        current: 0,
      },
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: '2',
    title: 'Người yêu thiên nhiên',
    description: 'Đăng 10 bài viết về môi trường',
    icon: '🌿',
    points: 200,
    category: 'environment',
    requirements: [
      {
        type: 'posts',
        target: 10,
        current: 2,
      },
    ],
    isUnlocked: false,
    progress: 2,
    maxProgress: 10,
  },
  {
    id: '3',
    title: 'Người mua sắm xanh',
    description: 'Mua 5 sản phẩm thân thiện môi trường',
    icon: '🛒',
    points: 150,
    category: 'shopping',
    requirements: [
      {
        type: 'purchases',
        target: 5,
        current: 0,
      },
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
  },
];

export const mockWeatherData: WeatherData = {
  temperature: 28.5,
  humidity: 75,
  windSpeed: 12.3,
  windDirection: 180,
  pressure: 1013.25,
  visibility: 10,
  uvIndex: 6,
  airQuality: {
    aqi: 45,
    pm25: 15,
    pm10: 25,
    o3: 120,
    no2: 30,
    so2: 8,
    co: 1.2,
  },
  timestamp: new Date().toISOString(),
};

export const mockEnvironmentData: EnvironmentData = {
  airQuality: 85,
  waterQuality: 90,
  soilQuality: 78,
  biodiversity: 82,
  carbonFootprint: 65,
  renewableEnergy: 45,
  wasteManagement: 88,
  timestamp: new Date().toISOString(),
};

export const mockAuthResponse: AuthResponse = {
  user: mockUsers[0],
  token: 'mock-jwt-token',
  refreshToken: 'mock-refresh-token',
};

export const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const simulateApiError = (message: string = 'API Error'): Promise<never> => {
  return Promise.reject(new Error(message));
};
