import type {
  EnvironmentData,
  GreenLocation,
  GreenLocationCreate,
  GreenLocationUpdate,
  HeatReportCreate,
  HeatReportResponse,
  Location,
  PaginatedResponse,
  SearchRequest,
  WeatherData,
  WeatherForecast,
} from '@/types';
import { GreenMapService } from './green-map.service';
import { HeatReportsService } from './heat-reports.service';
import { WeatherService } from './weather.service';

export class MapsService {
  private greenMapService: GreenMapService;
  private heatReportsService: HeatReportsService;
  private weatherService: WeatherService;

  constructor() {
    this.greenMapService = new GreenMapService();
    this.heatReportsService = new HeatReportsService();
    this.weatherService = new WeatherService();
  }

  // Green Map methods
  async getGreenLocations(
    minLat?: number,
    maxLat?: number,
    minLng?: number,
    maxLng?: number,
    locationType?: string,
    skip: number = 0,
    limit: number = 100
  ): Promise<GreenLocation[]> {
    return this.greenMapService.getLocations(minLat, maxLat, minLng, maxLng, locationType, skip, limit);
  }

  async createGreenLocation(locationData: GreenLocationCreate): Promise<GreenLocation> {
    return this.greenMapService.createLocation(locationData);
  }

  async getGreenLocation(locationId: string): Promise<GreenLocation> {
    return this.greenMapService.getLocation(locationId);
  }

  async updateGreenLocation(locationId: string, locationData: GreenLocationUpdate): Promise<GreenLocation> {
    return this.greenMapService.updateLocation(locationId, locationData);
  }

  async deleteGreenLocation(locationId: string): Promise<void> {
    return this.greenMapService.deleteLocation(locationId);
  }

  async searchGreenLocations(query: string, skip: number = 0, limit: number = 20): Promise<GreenLocation[]> {
    return this.greenMapService.searchLocations(query, skip, limit);
  }

  async getGreenLocationTypes(): Promise<string[]> {
    return this.greenMapService.getLocationTypes();
  }

  // Heat Reports methods
  async getHeatReports(
    minLat?: number,
    maxLat?: number,
    minLng?: number,
    maxLng?: number,
    hoursAgo: number = 24,
    skip: number = 0,
    limit: number = 100
  ): Promise<HeatReportResponse[]> {
    return this.heatReportsService.getHeatReports(minLat, maxLat, minLng, maxLng, hoursAgo, skip, limit);
  }

  async createHeatReport(heatReportData: HeatReportCreate): Promise<HeatReportResponse> {
    return this.heatReportsService.createHeatReport(heatReportData);
  }

  async getHeatmapData(
    minLat: number,
    maxLat: number,
    minLng: number,
    maxLng: number,
    hoursAgo: number = 24
  ): Promise<any> {
    return this.heatReportsService.getHeatmapData(minLat, maxLat, minLng, maxLng, hoursAgo);
  }

  async getUserHeatReports(userId: string, skip: number = 0, limit: number = 20): Promise<HeatReportResponse[]> {
    return this.heatReportsService.getUserHeatReports(userId, skip, limit);
  }

  async getHeatReport(reportId: string): Promise<HeatReportResponse> {
    return this.heatReportsService.getHeatReport(reportId);
  }

  // Weather methods
  async getCurrentWeather(lat: number, lng: number): Promise<any> {
    return this.weatherService.getCurrentWeather(lat, lng);
  }

  async getWeatherForecastData(lat: number, lng: number, days: number = 5): Promise<any> {
    return this.weatherService.getWeatherForecast(lat, lng, days);
  }

  async getCitiesWeather(): Promise<Record<string, any>> {
    return this.weatherService.getCitiesWeather();
  }

  // Legacy methods for backward compatibility
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
    // Convert to new API format
    const skip = (page - 1) * limit;
    const greenLocations = await this.getGreenLocations(
      bounds?.south,
      bounds?.north,
      bounds?.west,
      bounds?.east,
      type,
      skip,
      limit
    );

    // Convert GreenLocation to Location format for backward compatibility
    const locations: Location[] = greenLocations.map((greenLoc) => ({
      id: greenLoc._id,
      name: greenLoc.name,
      latitude: greenLoc.location.lat || 0,
      longitude: greenLoc.location.lng || 0,
      address: greenLoc.description || '',
      type: greenLoc.type as any,
      description: greenLoc.description || '',
      images: [],
      rating: 0,
      reviewsCount: 0,
      isVerified: true,
      isPublic: greenLoc.is_active,
      createdAt: greenLoc.created_at,
      updatedAt: greenLoc.updated_at,
    }));

    return {
      success: true,
      data: locations,
      pagination: {
        page,
        limit,
        total: locations.length,
        totalPages: Math.ceil(locations.length / limit),
        hasNext: locations.length === limit,
        hasPrev: page > 1,
      },
    };
  }

  // Legacy methods for backward compatibility
  async getLocation(locationId: string): Promise<Location> {
    const greenLocation = await this.getGreenLocation(locationId);
    return {
      id: greenLocation._id,
      name: greenLocation.name,
      latitude: greenLocation.location.lat || 0,
      longitude: greenLocation.location.lng || 0,
      address: greenLocation.description || '',
      type: greenLocation.type as any,
      description: greenLocation.description || '',
      images: [],
      rating: 0,
      reviewsCount: 0,
      isVerified: true,
      isPublic: greenLocation.is_active,
      createdAt: greenLocation.created_at,
      updatedAt: greenLocation.updated_at,
    };
  }

  async getWeatherData(latitude: number, longitude: number, days?: number): Promise<WeatherData> {
    const weather = await this.getCurrentWeather(latitude, longitude);
    const forecast = days ? await this.getWeatherForecastData(latitude, longitude, days) : undefined;
    
    return {
      temperature: weather.temperature || 0,
      humidity: weather.humidity || 0,
      windSpeed: weather.windSpeed || 0,
      windDirection: weather.windDirection || 0,
      pressure: weather.pressure || 0,
      visibility: weather.visibility || 0,
      uvIndex: weather.uvIndex || 0,
      weatherCondition: weather.condition || 'Unknown',
      weatherIcon: weather.icon || '',
      airQuality: weather.airQuality || {
        aqi: 0,
        pm25: 0,
        pm10: 0,
        o3: 0,
        no2: 0,
        so2: 0,
        co: 0,
        level: 'good',
      },
      forecast: forecast?.forecast || [],
      timestamp: new Date().toISOString(),
    };
  }

  async getEnvironmentData(latitude: number, longitude: number, radius?: number): Promise<EnvironmentData> {
    // This would need to be implemented based on actual environment data endpoint
    return {
      airQuality: 0,
      waterQuality: 0,
      soilQuality: 0,
      biodiversity: 0,
      carbonFootprint: 0,
      renewableEnergy: 0,
      wasteManagement: 0,
      noiseLevel: 0,
      lightPollution: 0,
      greenSpace: 0,
      timestamp: new Date().toISOString(),
    };
  }

  async addLocation(locationData: {
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    type: string;
    description: string;
    images?: string[];
  }): Promise<Location> {
    const greenLocation = await this.createGreenLocation({
      name: locationData.name,
      description: locationData.description,
      location: { lat: locationData.latitude, lng: locationData.longitude },
      type: locationData.type,
      data: { address: locationData.address, images: locationData.images },
    });

    return this.getLocation(greenLocation._id);
  }

  async updateLocation(locationId: string, locationData: Partial<Location>): Promise<Location> {
    const updateData: GreenLocationUpdate = {};
    
    if (locationData.name) updateData.name = locationData.name;
    if (locationData.description) updateData.description = locationData.description;
    if (locationData.latitude && locationData.longitude) {
      updateData.location = { lat: locationData.latitude, lng: locationData.longitude };
    }
    if (locationData.type) updateData.type = locationData.type;

    await this.updateGreenLocation(locationId, updateData);
    return this.getLocation(locationId);
  }

  async deleteLocation(locationId: string): Promise<void> {
    return this.deleteGreenLocation(locationId);
  }

  async searchLocations(searchRequest: SearchRequest): Promise<PaginatedResponse<Location>> {
    const greenLocations = await this.searchGreenLocations(searchRequest.query, 0, searchRequest.limit || 20);
    
    const locations: Location[] = greenLocations.map((greenLoc) => ({
      id: greenLoc._id,
      name: greenLoc.name,
      latitude: greenLoc.location.lat || 0,
      longitude: greenLoc.location.lng || 0,
      address: greenLoc.description || '',
      type: greenLoc.type as any,
      description: greenLoc.description || '',
      images: [],
      rating: 0,
      reviewsCount: 0,
      isVerified: true,
      isPublic: greenLoc.is_active,
      createdAt: greenLoc.created_at,
      updatedAt: greenLoc.updated_at,
    }));

    return {
      success: true,
      data: locations,
      pagination: {
        page: 1,
        limit: searchRequest.limit || 20,
        total: locations.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    };
  }

  async getLocationsByType(type: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Location>> {
    const skip = (page - 1) * limit;
    const greenLocations = await this.getGreenLocations(undefined, undefined, undefined, undefined, type, skip, limit);
    
    const locations: Location[] = greenLocations.map((greenLoc) => ({
      id: greenLoc._id,
      name: greenLoc.name,
      latitude: greenLoc.location.lat || 0,
      longitude: greenLoc.location.lng || 0,
      address: greenLoc.description || '',
      type: greenLoc.type as any,
      description: greenLoc.description || '',
      images: [],
      rating: 0,
      reviewsCount: 0,
      isVerified: true,
      isPublic: greenLoc.is_active,
      createdAt: greenLoc.created_at,
      updatedAt: greenLoc.updated_at,
    }));

    return {
      success: true,
      data: locations,
      pagination: {
        page,
        limit,
        total: locations.length,
        totalPages: Math.ceil(locations.length / limit),
        hasNext: locations.length === limit,
        hasPrev: page > 1,
      },
    };
  }

  async getNearbyLocations(latitude: number, longitude: number, radius: number = 5000, type?: string): Promise<Location[]> {
    const greenLocations = await this.greenMapService.getNearbyLocations(latitude, longitude, radius, type);
    
    return greenLocations.map((greenLoc) => ({
      id: greenLoc._id,
      name: greenLoc.name,
      latitude: greenLoc.location.lat || 0,
      longitude: greenLoc.location.lng || 0,
      address: greenLoc.description || '',
      type: greenLoc.type as any,
      description: greenLoc.description || '',
      images: [],
      rating: 0,
      reviewsCount: 0,
      isVerified: true,
      isPublic: greenLoc.is_active,
      createdAt: greenLoc.created_at,
      updatedAt: greenLoc.updated_at,
    }));
  }

  async getWeatherForecast(latitude: number, longitude: number, days: number = 7): Promise<WeatherForecast[]> {
    const forecast = await this.weatherService.getWeatherForecast(latitude, longitude, days);
    return forecast.forecast || [];
  }

  // Placeholder methods for features not yet implemented
  async rateLocation(locationId: string, rating: number): Promise<{ rating: number; totalRatings: number }> {
    return { rating, totalRatings: 0 };
  }

  async getLocationReviews(locationId: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<any>> {
    return { success: true, data: [], pagination: { page, limit, total: 0, totalPages: 0, hasNext: false, hasPrev: false } };
  }

  async addLocationReview(locationId: string, rating: number, comment: string): Promise<any> {
    return { id: '1', rating, comment, createdAt: new Date().toISOString() };
  }

  async reportLocation(locationId: string, reason: string, description?: string): Promise<void> {
    return;
  }

  async getFeaturedLocations(limit: number = 10): Promise<Location[]> {
    return [];
  }

  async getEcoFriendlyLocations(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Location>> {
    return this.getLocationsByType('eco-friendly', page, limit);
  }
}