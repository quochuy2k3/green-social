import { API_CONFIG, ENV_CONFIG } from '@/constants';
import type { Achievement } from '@/types';
import { api } from './api';
import { achievementMockService } from './mockService';

export class AchievementService {
  // Get all achievements
  async getAchievements(): Promise<Achievement[]> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return achievementMockService.getAchievements();
    }
    
    return api.get<Achievement[]>(API_CONFIG.ENDPOINTS.ACHIEVEMENTS.BASE);
  }

  // Get user achievements
  async getUserAchievements(): Promise<Achievement[]> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return achievementMockService.getUserAchievements();
    }
    
    return api.get<Achievement[]>(API_CONFIG.ENDPOINTS.ACHIEVEMENTS.USER_ACHIEVEMENTS);
  }

  // Get achievements by category
  async getAchievementsByCategory(category: string): Promise<Achievement[]> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      const achievements = await achievementMockService.getAchievements();
      return achievements.filter(achievement => achievement.category === category);
    }
    
    return api.get<Achievement[]>(`${API_CONFIG.ENDPOINTS.ACHIEVEMENTS.BASE}?category=${category}`);
  }

  // Get single achievement
  async getAchievement(achievementId: string): Promise<Achievement> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return achievementMockService.getAchievement(achievementId);
    }
    
    return api.get<Achievement>(`${API_CONFIG.ENDPOINTS.ACHIEVEMENTS.BASE}/${achievementId}`);
  }

  // Unlock achievement (usually called automatically by the system)
  async unlockAchievement(achievementId: string): Promise<Achievement> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      throw new Error('Mock achievement unlock not implemented');
    }
    
    return api.post<Achievement>(
      `${API_CONFIG.ENDPOINTS.ACHIEVEMENTS.UNLOCK}/${achievementId}`
    );
  }

  // Get achievement progress
  async getAchievementProgress(achievementId: string): Promise<{
    progress: number;
    maxProgress: number;
    isUnlocked: boolean;
  }> {
    if (ENV_CONFIG.USE_MOCK_DATA) {
      const achievement = await achievementMockService.getAchievement(achievementId);
      return {
        progress: achievement.progress,
        maxProgress: achievement.maxProgress,
        isUnlocked: achievement.isUnlocked,
      };
    }
    
    return api.get<{
      progress: number;
      maxProgress: number;
      isUnlocked: boolean;
    }>(`${API_CONFIG.ENDPOINTS.ACHIEVEMENTS.BASE}/${achievementId}/progress`);
  }
}