import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AchievementCard, ProfileHeader, SettingsList } from '../../screens/profile/components';
import { mockAchievements, mockSettingsItems, mockUser } from '../../screens/profile/data/mockData';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileHeader user={mockUser} />
      
      <View style={styles.content}>
        <AchievementCard achievements={mockAchievements} />
        <SettingsList settingsItems={mockSettingsItems} />
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
