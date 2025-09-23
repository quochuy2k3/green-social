import { API_CONFIG } from '@/constants';
import type { GreenLocation, GreenLocationCreate, GreenLocationUpdate } from '@/types';
import { api } from './api';

export class GreenMapService {
  // Get locations
  async getLocations(
    minLat?: number,
    maxLat?: number,
    minLng?: number,
    maxLng?: number,
    locationType?: string,
    skip: number = 0,
    limit: number = 100
  ): Promise<GreenLocation[]> {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });

    if (minLat !== undefined) params.append('min_lat', minLat.toString());
    if (maxLat !== undefined) params.append('max_lat', maxLat.toString());
    if (minLng !== undefined) params.append('min_lng', minLng.toString());
    if (maxLng !== undefined) params.append('max_lng', maxLng.toString());
    if (locationType) params.append('location_type', locationType);

    return api.get<GreenLocation[]>(`${API_CONFIG.ENDPOINTS.GREEN_MAP.BASE}?${params.toString()}`);
  }

  // Create location
  async createLocation(locationData: GreenLocationCreate): Promise<GreenLocation> {
    return api.post<GreenLocation>(API_CONFIG.ENDPOINTS.GREEN_MAP.BASE, locationData);
  }

  // Get location types
  async getLocationTypes(): Promise<string[]> {
    return api.get<string[]>(API_CONFIG.ENDPOINTS.GREEN_MAP.TYPES);
  }

  // Search locations
  async searchLocations(
    query: string,
    skip: number = 0,
    limit: number = 20
  ): Promise<GreenLocation[]> {
    const params = new URLSearchParams({
      q: query,
      skip: skip.toString(),
      limit: limit.toString(),
    });

    return api.get<GreenLocation[]>(`${API_CONFIG.ENDPOINTS.GREEN_MAP.SEARCH}?${params.toString()}`);
  }

  // Get single location
  async getLocation(locationId: string): Promise<GreenLocation> {
    return api.get<GreenLocation>(API_CONFIG.ENDPOINTS.GREEN_MAP.LOCATION_BY_ID.replace('{location_id}', locationId));
  }

  // Update location
  async updateLocation(locationId: string, locationData: GreenLocationUpdate): Promise<GreenLocation> {
    return api.put<GreenLocation>(
      API_CONFIG.ENDPOINTS.GREEN_MAP.LOCATION_BY_ID.replace('{location_id}', locationId),
      locationData
    );
  }

  // Delete location
  async deleteLocation(locationId: string): Promise<void> {
    return api.delete<void>(API_CONFIG.ENDPOINTS.GREEN_MAP.LOCATION_BY_ID.replace('{location_id}', locationId));
  }

  // Get locations in bounds
  async getLocationsInBounds(
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    },
    locationType?: string,
    limit: number = 100
  ): Promise<GreenLocation[]> {
    return this.getLocations(
      bounds.south,
      bounds.north,
      bounds.west,
      bounds.east,
      locationType,
      0,
      limit
    );
  }

  // Get locations by type
  async getLocationsByType(
    locationType: string,
    skip: number = 0,
    limit: number = 100
  ): Promise<GreenLocation[]> {
    return this.getLocations(undefined, undefined, undefined, undefined, locationType, skip, limit);
  }

  // Get nearby locations
  async getNearbyLocations(
    latitude: number,
    longitude: number,
    radius: number = 5000,
    locationType?: string
  ): Promise<GreenLocation[]> {
    const bounds = {
      north: latitude + (radius / 111000), // Rough conversion from meters to degrees
      south: latitude - (radius / 111000),
      east: longitude + (radius / (111000 * Math.cos(latitude * Math.PI / 180))),
      west: longitude - (radius / (111000 * Math.cos(latitude * Math.PI / 180))),
    };

    return this.getLocationsInBounds(bounds, locationType);
  }
}
