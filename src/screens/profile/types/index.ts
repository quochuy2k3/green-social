export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  greenPoints: number;
  rank: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  completedAt: Date;
}

export interface SettingsItem {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
  onPress: () => void;
}

export interface UserStats {
  greenPoints: number;
  rank: number;
}
