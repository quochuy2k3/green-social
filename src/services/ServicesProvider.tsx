import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import { AchievementService } from "./achievement.service";
import { AuthService } from "./auth.service";
import { CommunityService } from "./community.service";
import { GreenMapService } from "./green-map.service";
import { HeatReportsService } from "./heat-reports.service";
import { MapsService } from "./maps.service";
import { NotificationService } from "./notification.service";
import { StorageService } from "./storage.service";
import { StoreService } from "./store.service";
import { WeatherService } from "./weather.service";

const authService = new AuthService();
const communityService = new CommunityService();
const storeService = new StoreService();
const mapsService = new MapsService();
const achievementService = new AchievementService();
const storageService = new StorageService();
const notificationService = new NotificationService();
const weatherService = new WeatherService();
const greenMapService = new GreenMapService();
const heatReportsService = new HeatReportsService();
export const services = {
  AuthService: authService,
  CommunityService: communityService,
  StoreService: storeService,
  MapsService: mapsService,
  AchievementService: achievementService,
  StorageService: storageService,
  NotificationService: notificationService,
  WeatherService: weatherService,
  GreenMapService: greenMapService,
  HeatReportsService: heatReportsService,
} as const;

type Services = typeof services;

const ServiceContext = createContext<Services>(services);

export function useServices() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function ServicesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={services}>
        {children}
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
}
