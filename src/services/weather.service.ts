import { API_CONFIG } from '@/constants';
import { api } from './api';

export class WeatherService {
  // Get current weather
  async getCurrentWeather(lat: number, lng: number): Promise<any> {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
    });

    return api.get<any>(`${API_CONFIG.ENDPOINTS.WEATHER.CURRENT}?${params.toString()}`);
  }

  // Get weather forecast
  async getWeatherForecast(
    lat: number,
    lng: number,
    days: number = 5
  ): Promise<any> {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      days: days.toString(),
    });

    return api.get<any>(`${API_CONFIG.ENDPOINTS.WEATHER.FORECAST}?${params.toString()}`);
  }

  // Get cities weather
  async getCitiesWeather(): Promise<Record<string, any>> {
    return api.get<Record<string, any>>(API_CONFIG.ENDPOINTS.WEATHER.CITIES);
  }

  // Get weather for specific location
  async getWeatherForLocation(latitude: number, longitude: number): Promise<{
    current: any;
    forecast: any;
  }> {
    const [current, forecast] = await Promise.all([
      this.getCurrentWeather(latitude, longitude),
      this.getWeatherForecast(latitude, longitude),
    ]);

    return {
      current,
      forecast,
    };
  }

  // Get weather summary for location
  async getWeatherSummary(latitude: number, longitude: number): Promise<{
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    forecast: any[];
  }> {
    const weatherData = await this.getWeatherForLocation(latitude, longitude);
    
    return {
      temperature: weatherData.current?.temperature || 0,
      condition: weatherData.current?.condition || 'Unknown',
      humidity: weatherData.current?.humidity || 0,
      windSpeed: weatherData.current?.windSpeed || 0,
      forecast: weatherData.forecast?.forecast || [],
    };
  }
}
