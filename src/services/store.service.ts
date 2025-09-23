import { API_CONFIG } from '@/constants';
import type {
  Address,
  Category,
  Order,
  PaginatedResponse,
  Product,
  SearchRequest,
  SubCategory,
} from '@/types';
import { api } from './api';

export class StoreService {
  // Get products with pagination and filters
  async getProducts(
    page: number = 1,
    limit: number = 20,
    category?: string,
    search?: string
  ): Promise<PaginatedResponse<Product>> {
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
    return api.get<Product>(`${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}/${productId}`);
  }

  // Get product categories
  async getCategories(): Promise<Category[]> {
    return api.get<Category[]>(API_CONFIG.ENDPOINTS.STORE.CATEGORIES);
  }

  // Get featured products
  async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    return api.get<Product[]>(`${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}/featured?limit=${limit}`);
  }

  // Get user orders
  async getOrders(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Order>> {
    return api.get<PaginatedResponse<Order>>(
      `${API_CONFIG.ENDPOINTS.STORE.ORDERS}?page=${page}&limit=${limit}`
    );
  }

  // Get single order
  async getOrder(orderId: string): Promise<Order> {
    return api.get<Order>(`${API_CONFIG.ENDPOINTS.STORE.ORDERS}/${orderId}`);
  }

  // Create order
  async createOrder(orderData: {
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: any;
  }): Promise<Order> {
    return api.post<Order>(API_CONFIG.ENDPOINTS.STORE.ORDERS, orderData);
  }

  // Cancel order
  async cancelOrder(orderId: string): Promise<Order> {
    return api.patch<Order>(`${API_CONFIG.ENDPOINTS.STORE.ORDERS}/${orderId}/cancel`);
  }

  // Search products
  async searchProducts(searchRequest: SearchRequest): Promise<PaginatedResponse<Product>> {
    return api.post<PaginatedResponse<Product>>(`${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}/search`, searchRequest);
  }

  // Get products by category
  async getProductsByCategory(categoryId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Product>> {
    return api.get<PaginatedResponse<Product>>(
      `${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}?category=${categoryId}&page=${page}&limit=${limit}`
    );
  }

  // Get subcategories
  async getSubcategories(categoryId: string): Promise<SubCategory[]> {
    return api.get<SubCategory[]>(`${API_CONFIG.ENDPOINTS.STORE.CATEGORIES}/${categoryId}/subcategories`);
  }

  // Get product reviews
  async getProductReviews(productId: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<any>> {
    return api.get<PaginatedResponse<any>>(
      `${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}/${productId}/reviews?page=${page}&limit=${limit}`
    );
  }

  // Add product review
  async addProductReview(productId: string, rating: number, comment: string): Promise<any> {
    return api.post<any>(`${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}/${productId}/reviews`, {
      rating,
      comment,
    });
  }

  // Get user addresses
  async getUserAddresses(): Promise<Address[]> {
    return api.get<Address[]>(`${API_CONFIG.ENDPOINTS.STORE.BASE}/addresses`);
  }

  // Add user address
  async addAddress(address: Omit<Address, 'id'>): Promise<Address> {
    return api.post<Address>(`${API_CONFIG.ENDPOINTS.STORE.BASE}/addresses`, address);
  }

  // Update user address
  async updateAddress(addressId: string, address: Partial<Address>): Promise<Address> {
    return api.put<Address>(`${API_CONFIG.ENDPOINTS.STORE.BASE}/addresses/${addressId}`, address);
  }

  // Delete user address
  async deleteAddress(addressId: string): Promise<void> {
    return api.delete<void>(`${API_CONFIG.ENDPOINTS.STORE.BASE}/addresses/${addressId}`);
  }

  // Get eco-friendly products
  async getEcoFriendlyProducts(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Product>> {
    return api.get<PaginatedResponse<Product>>(
      `${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}/eco-friendly?page=${page}&limit=${limit}`
    );
  }

  // Get product recommendations
  async getProductRecommendations(productId?: string, limit: number = 10): Promise<Product[]> {
    const url = productId 
      ? `${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}/${productId}/recommendations?limit=${limit}`
      : `${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}/recommendations?limit=${limit}`;
    
    return api.get<Product[]>(url);
  }
}