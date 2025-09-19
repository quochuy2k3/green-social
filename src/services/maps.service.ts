import { API_CONFIG, ENV_CONFIG } from '@/constants';
import type {
  EnvironmentData,
  Location,
  PaginatedResponse,
  WeatherData,
} from '@/types';
import { api } from './api';
import { mapsMockService } from './mockService';

export class MapsService {
  // Get locations with pagination and filters
  async getLocations(
    page: number = 1,
    limit: number = 20,
    type?: string,
    search?: string,
    bounds?: {
      north: number;
      south: number;
      east: number;
      west: number;
    }
  ): Promise<PaginatedResponse<Location>> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return mapsMockService.getLocations(page, limit, type, search);
    }
    
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (type) params.append('type', type);
    if (search) params.append('search', search);
    if (bounds) {
      params.append('bounds', JSON.stringify(bounds));
    }

    return api.get<PaginatedResponse<Location>>(
      `${API_CONFIG.ENDPOINTS.MAPS.LOCATIONS}?${params.toString()}`
    );
  }

  // Get single location
  async getLocation(locationId: string): Promise<Location> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return mapsMockService.getLocation(locationId);
    }
    
    return api.get<Location>(`${API_CONFIG.ENDPOINTS.MAPS.LOCATIONS}/${locationId}`);
  }

  // Get weather data for location
  async getWeatherData(
    latitude: number,
    longitude: number,
    days?: number
  ): Promise<WeatherData> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return mapsMockService.getWeatherData(latitude, longitude);
    }
    
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lng: longitude.toString(),
    });
    
    if (days) params.append('days', days.toString());

    return api.get<WeatherData>(`${API_CONFIG.ENDPOINTS.MAPS.WEATHER}?${params.toString()}`);
  }

  // Get environment data for location
  async getEnvironmentData(
    latitude: number,
    longitude: number,
    radius?: number
  ): Promise<EnvironmentData> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return mapsMockService.getEnvironmentData(latitude, longitude);
    }
    
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lng: longitude.toString(),
    });
    
    if (radius) params.append('radius', radius.toString());

    return api.get<EnvironmentData>(`${API_CONFIG.ENDPOINTS.MAPS.ENVIRONMENT}?${params.toString()}`);
  }

  // Add new location
  async addLocation(locationData: {
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    type: string;
    description: string;
    images?: string[];
  }): Promise<Location> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      throw new Error('Mock location creation not implemented');
    }
    
    return api.post<Location>(API_CONFIG.ENDPOINTS.MAPS.LOCATIONS, locationData);
  }

  // Update location
  async updateLocation(
    locationId: string,
    locationData: Partial<Location>
  ): Promise<Location> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      throw new Error('Mock location update not implemented');
    }
    
    return api.put<Location>(`${API_CONFIG.ENDPOINTS.MAPS.LOCATIONS}/${locationId}`, locationData);
  }

  // Delete location
  async deleteLocation(locationId: string): Promise<void> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return Promise.resolve();
    }
    
    return api.delete<void>(`${API_CONFIG.ENDPOINTS.MAPS.LOCATIONS}/${locationId}`);
  }

  // Rate location
  async rateLocation(
    locationId: string,
    rating: number
  ): Promise<{ rating: number; totalRatings: number }> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return Promise.resolve({ rating, totalRatings: 10 });
    }
    
    return api.post<{ rating: number; totalRatings: number }>(
      `${API_CONFIG.ENDPOINTS.MAPS.LOCATIONS}/${locationId}/rate`,
      { rating }
    );
  }
}