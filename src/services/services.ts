import { AchievementService } from './achievement.service';
import { AuthService } from './auth.service';
import { CommunityService } from './community.service';
import { MapsService } from './maps.service';
import { StoreService } from './store.service';

// Create service instances
const authService = new AuthService();
const communityService = new CommunityService();
const storeService = new StoreService();
const mapsService = new MapsService();
const achievementService = new AchievementService();

// Default services object
const defaultServices = {
  authService,
  communityService,
  storeService,
  mapsService,
  achievementService,
};

export default defaultServices;
