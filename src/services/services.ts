import { AchievementService } from './achievement.service';
import { AuthService } from './auth.service';
import { CommunityService } from './community.service';
import { GreenMapService } from './green-map.service';
import { HeatReportsService } from './heat-reports.service';
import { MapsService } from './maps.service';
import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';
import { StoreService } from './store.service';
import { WeatherService } from './weather.service';

// Create service instances
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

// Default services object
const defaultServices = {
  authService,
  communityService,
  storeService,
  mapsService,
  achievementService,
  storageService,
  notificationService,
  weatherService,
  greenMapService,
  heatReportsService,
};

export default defaultServices;
