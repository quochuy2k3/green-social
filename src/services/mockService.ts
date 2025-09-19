import type {
  Achievement,
  AuthResponse,
  Category,
  Comment,
  EnvironmentData,
  Location,
  PaginatedResponse,
  Post,
  Product,
  User,
  WeatherData,
} from '@/types';
import {
  mockAchievements,
  mockAuthResponse,
  mockCategories,
  mockComments,
  mockEnvironmentData,
  mockLocations,
  mockPosts,
  mockProducts,
  mockUsers,
  mockWeatherData,
  simulateApiDelay,
  simulateApiError,
} from './mockData';

export const mockService = {
  paginate: <T>(data: T[], page: number, limit: number): PaginatedResponse<T> => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: data.length,
        totalPages: Math.ceil(data.length / limit),
      },
    };
  },

  findById: <T extends { id: string }>(data: T[], id: string): T | undefined => {
    return data.find(item => item.id === id);
  },

  create: <T extends { id: string }>(data: T[], newItem: Omit<T, 'id'>): T => {
    const createdItem = {
      ...newItem,
      id: Date.now().toString(),
    } as T;
    
    data.push(createdItem);
    return createdItem;
  },

  update: <T extends { id: string }>(data: T[], id: string, updates: Partial<T>): T | undefined => {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      return data[index];
    }
    return undefined;
  },

  delete: <T extends { id: string }>(data: T[], id: string): boolean => {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      return true;
    }
    return false;
  },
};

export const authMockService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await simulateApiDelay();
    
    if (email === 'test@example.com' && password === 'password') {
      return mockAuthResponse;
    } else {
      throw simulateApiError('Invalid credentials');
    }
  },

  register: async (userData: any): Promise<AuthResponse> => {
    await simulateApiDelay();
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      avatar: 'https://via.placeholder.com/150',
      bio: '',
      location: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isVerified: false,
      points: 0,
      level: 1,
    };
    
    return {
      user: newUser,
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
    };
  },

  getProfile: async (): Promise<User> => {
    await simulateApiDelay();
    return mockUsers[0];
  },

  updateProfile: async (profileData: any): Promise<User> => {
    await simulateApiDelay();
    return { ...mockUsers[0], ...profileData };
  },
};

export const communityMockService = {
  getPosts: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Post>> => {
    await simulateApiDelay();
    return mockService.paginate(mockPosts, page, limit);
  },

  getPost: async (postId: string): Promise<Post> => {
    await simulateApiDelay();
    const post = mockService.findById(mockPosts, postId);
    if (!post) throw simulateApiError('Post not found');
    return post;
  },

  createPost: async (postData: any): Promise<Post> => {
    await simulateApiDelay();
    return mockService.create(mockPosts, postData);
  },

  getComments: async (postId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Comment>> => {
    await simulateApiDelay();
    const postComments = mockComments.filter(comment => comment.postId === postId);
    return mockService.paginate(postComments, page, limit);
  },

  createComment: async (commentData: any): Promise<Comment> => {
    await simulateApiDelay();
    return mockService.create(mockComments, commentData);
  },
};

export const storeMockService = {
  getProducts: async (page: number = 1, limit: number = 20, category?: string, search?: string): Promise<PaginatedResponse<Product>> => {
    await simulateApiDelay();
    
    let filteredProducts = mockProducts;
    
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    if (search) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return mockService.paginate(filteredProducts, page, limit);
  },

  getProduct: async (productId: string): Promise<Product> => {
    await simulateApiDelay();
    const product = mockService.findById(mockProducts, productId);
    if (!product) throw simulateApiError('Product not found');
    return product;
  },

  getCategories: async (): Promise<Category[]> => {
    await simulateApiDelay();
    return mockCategories;
  },
};

export const mapsMockService = {
  getLocations: async (page: number = 1, limit: number = 20, type?: string, search?: string): Promise<PaginatedResponse<Location>> => {
    await simulateApiDelay();
    
    let filteredLocations = mockLocations;
    
    if (type) {
      filteredLocations = filteredLocations.filter(location => location.type === type);
    }
    
    if (search) {
      filteredLocations = filteredLocations.filter(location => 
        location.name.toLowerCase().includes(search.toLowerCase()) ||
        location.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return mockService.paginate(filteredLocations, page, limit);
  },

  getLocation: async (locationId: string): Promise<Location> => {
    await simulateApiDelay();
    const location = mockService.findById(mockLocations, locationId);
    if (!location) throw simulateApiError('Location not found');
    return location;
  },

  getWeatherData: async (latitude: number, longitude: number): Promise<WeatherData> => {
    await simulateApiDelay();
    return mockWeatherData;
  },

  getEnvironmentData: async (latitude: number, longitude: number): Promise<EnvironmentData> => {
    await simulateApiDelay();
    return mockEnvironmentData;
  },
};

export const achievementMockService = {
  getAchievements: async (): Promise<Achievement[]> => {
    await simulateApiDelay();
    return mockAchievements;
  },

  getUserAchievements: async (): Promise<Achievement[]> => {
    await simulateApiDelay();
    return mockAchievements;
  },

  getAchievement: async (achievementId: string): Promise<Achievement> => {
    await simulateApiDelay();
    const achievement = mockService.findById(mockAchievements, achievementId);
    if (!achievement) throw simulateApiError('Achievement not found');
    return achievement;
  },
};
