import { API_CONFIG } from '@/constants';
import type { HeatReportCreate, HeatReportResponse } from '@/types';
import { api } from './api';

export class HeatReportsService {
  // Get heat reports
  async getHeatReports(
    minLat?: number,
    maxLat?: number,
    minLng?: number,
    maxLng?: number,
    hoursAgo: number = 24,
    skip: number = 0,
    limit: number = 100
  ): Promise<HeatReportResponse[]> {
    const params = new URLSearchParams({
      hours_ago: hoursAgo.toString(),
      skip: skip.toString(),
      limit: limit.toString(),
    });

    if (minLat !== undefined) params.append('min_lat', minLat.toString());
    if (maxLat !== undefined) params.append('max_lat', maxLat.toString());
    if (minLng !== undefined) params.append('min_lng', minLng.toString());
    if (maxLng !== undefined) params.append('max_lng', maxLng.toString());

    return api.get<HeatReportResponse[]>(`${API_CONFIG.ENDPOINTS.HEAT_REPORTS.BASE}?${params.toString()}`);
  }

  // Create heat report
  async createHeatReport(heatReportData: HeatReportCreate): Promise<HeatReportResponse> {
    return api.post<HeatReportResponse>(API_CONFIG.ENDPOINTS.HEAT_REPORTS.BASE, heatReportData);
  }

  // Get heatmap data
  async getHeatmapData(
    minLat: number,
    maxLat: number,
    minLng: number,
    maxLng: number,
    hoursAgo: number = 24
  ): Promise<any> {
    const params = new URLSearchParams({
      min_lat: minLat.toString(),
      max_lat: maxLat.toString(),
      min_lng: minLng.toString(),
      max_lng: maxLng.toString(),
      hours_ago: hoursAgo.toString(),
    });

    return api.get<any>(`${API_CONFIG.ENDPOINTS.HEAT_REPORTS.HEATMAP}?${params.toString()}`);
  }

  // Get user heat reports
  async getUserHeatReports(
    userId: string,
    skip: number = 0,
    limit: number = 20
  ): Promise<HeatReportResponse[]> {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });

    return api.get<HeatReportResponse[]>(
      `${API_CONFIG.ENDPOINTS.HEAT_REPORTS.USER_REPORTS.replace('{user_id}', userId)}?${params.toString()}`
    );
  }

  // Get single heat report
  async getHeatReport(reportId: string): Promise<HeatReportResponse> {
    return api.get<HeatReportResponse>(API_CONFIG.ENDPOINTS.HEAT_REPORTS.REPORT_BY_ID.replace('{report_id}', reportId));
  }

  // Get heat reports in bounds
  async getHeatReportsInBounds(
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    },
    hoursAgo: number = 24,
    limit: number = 100
  ): Promise<HeatReportResponse[]> {
    return this.getHeatReports(
      bounds.south,
      bounds.north,
      bounds.west,
      bounds.east,
      hoursAgo,
      0,
      limit
    );
  }

  // Get recent heat reports
  async getRecentHeatReports(hoursAgo: number = 24, limit: number = 50): Promise<HeatReportResponse[]> {
    return this.getHeatReports(undefined, undefined, undefined, undefined, hoursAgo, 0, limit);
  }
}
