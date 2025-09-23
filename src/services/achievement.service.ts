import { API_CONFIG } from '@/constants';
import type { Achievement, AchievementReward, PaginatedResponse } from '@/types';
import { api } from './api';

export class AchievementService {
  // Get all achievements
  async getAchievements(): Promise<Achievement[]> {
    return api.get<Achievement[]>(API_CONFIG.ENDPOINTS.ACHIEVEMENTS.BASE);
  }

  // Get user achievements
  async getUserAchievements(): Promise<any[]> {
    return api.get<any[]>(API_CONFIG.ENDPOINTS.ACHIEVEMENTS.USER);
  }

  // Check user achievements
  async checkUserAchievements(): Promise<any> {
    return api.post<any>(API_CONFIG.ENDPOINTS.ACHIEVEMENTS.CHECK);
  }

  // Get achievements by category
  async getAchievementsByCategory(category: string): Promise<Achievement[]> {
    return api.get<Achievement[]>(`${API_CONFIG.ENDPOINTS.ACHIEVEMENTS.BASE}?category=${category}`);
  }

  // Get single achievement
  async getAchievement(achievementId: string): Promise<Achievement> {
    return api.get<Achievement>(API_CONFIG.ENDPOINTS.ACHIEVEMENTS.BY_ID.replace('{achievement_id}', achievementId));
  }

  // Legacy methods for backward compatibility
  async unlockAchievement(achievementId: string): Promise<Achievement> {
    // This would need to be implemented based on actual unlock endpoint
    return this.getAchievement(achievementId);
  }

  async getAchievementProgress(achievementId: string): Promise<{
    progress: number;
    maxProgress: number;
    isUnlocked: boolean;
  }> {
    // This would need to be implemented based on actual progress endpoint
    return {
      progress: 0,
      maxProgress: 100,
      isUnlocked: false,
    };
  }

  async getAchievementsPaginated(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Achievement>> {
    const achievements = await this.getAchievements();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAchievements = achievements.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedAchievements,
      pagination: {
        page,
        limit,
        total: achievements.length,
        totalPages: Math.ceil(achievements.length / limit),
        hasNext: endIndex < achievements.length,
        hasPrev: page > 1,
      },
    };
  }

  async getAchievementsByRarity(rarity: 'common' | 'rare' | 'epic' | 'legendary'): Promise<Achievement[]> {
    const achievements = await this.getAchievements();
    return achievements.filter(achievement => achievement.type === rarity);
  }

  async getRecentAchievements(limit: number = 10): Promise<Achievement[]> {
    const achievements = await this.getAchievements();
    return achievements.slice(0, limit);
  }

  async getAchievementLeaderboard(achievementId: string, limit: number = 10): Promise<any[]> {
    // This would need to be implemented based on actual leaderboard endpoint
    return [];
  }

  async claimAchievementReward(achievementId: string, rewardId: string): Promise<AchievementReward> {
    // This would need to be implemented based on actual reward claim endpoint
    return {
      type: 'points',
      value: 0,
      description: 'No reward available',
    };
  }

  async getUserAchievementStats(): Promise<{
    totalAchievements: number;
    unlockedAchievements: number;
    totalPoints: number;
    level: number;
    nextLevelPoints: number;
  }> {
    const userAchievements = await this.getUserAchievements();
    const allAchievements = await this.getAchievements();
    
    return {
      totalAchievements: allAchievements.length,
      unlockedAchievements: userAchievements.length,
      totalPoints: userAchievements.reduce((sum, achievement) => sum + (achievement.points_required || 0), 0),
      level: Math.floor(userAchievements.length / 10) + 1,
      nextLevelPoints: ((Math.floor(userAchievements.length / 10) + 1) * 10) - userAchievements.length,
    };
  }

  async getAchievementCategories(): Promise<string[]> {
    const achievements = await this.getAchievements();
    const categories = new Set(achievements.map(achievement => achievement.type));
    return Array.from(categories);
  }
}