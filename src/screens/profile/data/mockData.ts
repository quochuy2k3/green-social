import { Achievement, SettingsItem, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Tên người dùng',
  email: 'user@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  greenPoints: 1580,
  rank: 5,
};

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Người trồng cây',
    description: 'Đã trồng 10 cây xanh',
    icon: 'tree',
    iconColor: '#10b981',
    completedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Chuyên gia tái chế',
    description: 'Tái chế 50 vật phẩm',
    icon: 'refresh-cw',
    iconColor: '#10b981',
    completedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    title: 'Tiết kiệm năng lượng',
    description: 'Giảm 30% tiêu thụ điện',
    icon: 'zap',
    iconColor: '#f59e0b',
    completedAt: new Date('2024-01-05'),
  },
];

export const mockSettingsItems: SettingsItem[] = [
  {
    id: '1',
    title: 'Cài đặt',
    icon: 'settings',
    iconColor: '#6b7280',
    onPress: () => console.log('Settings pressed'),
  },
  {
    id: '2',
    title: 'Thông báo',
    icon: 'bell',
    iconColor: '#6b7280',
    onPress: () => console.log('Notifications pressed'),
  },
  {
    id: '3',
    title: 'Bảng xếp hạng',
    icon: 'award',
    iconColor: '#6b7280',
    onPress: () => console.log('Leaderboard pressed'),
  },
  {
    id: '4',
    title: 'Trợ giúp',
    icon: 'help-circle',
    iconColor: '#6b7280',
    onPress: () => console.log('Help pressed'),
  },
];
