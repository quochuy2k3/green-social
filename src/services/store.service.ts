import { API_CONFIG, ENV_CONFIG } from '@/constants';
import type {
  Category,
  Order,
  PaginatedResponse,
  Product,
} from '@/types';
import { api } from './api';
import { storeMockService } from './mockService';

export class StoreService {
  // Get products with pagination and filters
  async getProducts(
    page: number = 1,
    limit: number = 20,
    category?: string,
    search?: string
  ): Promise<PaginatedResponse<Product>> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return storeMockService.getProducts(page, limit, category, search);
    }
    
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (category) params.append('category', category);
    if (search) params.append('search', search);

    return api.get<PaginatedResponse<Product>>(
      `${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}?${params.toString()}`
    );
  }

  // Get single product
  async getProduct(productId: string): Promise<Product> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return storeMockService.getProduct(productId);
    }
    
    return api.get<Product>(`${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}/${productId}`);
  }

  // Get product categories
  async getCategories(): Promise<Category[]> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return storeMockService.getCategories();
    }
    
    return api.get<Category[]>(API_CONFIG.ENDPOINTS.STORE.CATEGORIES);
  }

  // Get featured products
  async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      const result = await storeMockService.getProducts(1, limit);
      return result.data;
    }
    
    return api.get<Product[]>(`${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}/featured?limit=${limit}`);
  }

  // Get user orders
  async getOrders(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Order>> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return Promise.resolve({
        success: true,
        data: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
      });
    }
    
    return api.get<PaginatedResponse<Order>>(
      `${API_CONFIG.ENDPOINTS.STORE.ORDERS}?page=${page}&limit=${limit}`
    );
  }

  // Get single order
  async getOrder(orderId: string): Promise<Order> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      throw new Error('Order not found');
    }
    
    return api.get<Order>(`${API_CONFIG.ENDPOINTS.STORE.ORDERS}/${orderId}`);
  }

  // Create order
  async createOrder(orderData: {
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: any;
  }): Promise<Order> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      throw new Error('Mock order creation not implemented');
    }
    
    return api.post<Order>(API_CONFIG.ENDPOINTS.STORE.ORDERS, orderData);
  }

  // Cancel order
  async cancelOrder(orderId: string): Promise<Order> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      throw new Error('Mock order cancellation not implemented');
    }
    
    return api.patch<Order>(`${API_CONFIG.ENDPOINTS.STORE.ORDERS}/${orderId}/cancel`);
  }
}