import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import { AchievementService } from "./achievement.service";
import { AuthService } from "./auth.service";
import { CommunityService } from "./community.service";
import { MapsService } from "./maps.service";
import { StoreService } from "./store.service";

// Create service instances
const authService = new AuthService();
const communityService = new CommunityService();
const storeService = new StoreService();
const mapsService = new MapsService();
const achievementService = new AchievementService();

// Services object
export const services = {
  AuthService: authService,
  CommunityService: communityService,
  StoreService: storeService,
  MapsService: mapsService,
  AchievementService: achievementService,
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

// Create QueryClient instance
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
