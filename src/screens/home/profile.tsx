import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { AchievementCard, ProfileHeader, SettingsList } from '../../screens/profile/components';
import { mockAchievements, mockSettingsItems } from '../../screens/profile/data/mockData';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const profileUser = user ? {
    id: user.id,
    name: user.full_name || user.username,
    email: user.email,
    avatar: undefined, // Add avatar field if available in user profile
    greenPoints: user.green_points || 0,
    rank: 1, // You might want to calculate this based on green_points
  } : null;

  // Add logout to settings items
  const settingsWithLogout = [
    ...mockSettingsItems,
    {
      id: 'logout',
      title: 'Đăng xuất',
      icon: 'log-out',
      iconColor: '#ef4444',
      onPress: logout,
    }
  ];

  if (!profileUser) {
    return null; // or loading component
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileHeader user={profileUser} />
      
      <View style={styles.content}>
        <AchievementCard achievements={mockAchievements} />
        <SettingsList settingsItems={settingsWithLogout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
});
