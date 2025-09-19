import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SettingsItem } from '../types';

interface SettingsListProps {
  settingsItems: SettingsItem[];
}

export default function SettingsList({ settingsItems }: SettingsListProps) {
  return (
    <View style={styles.container}>
      {settingsItems.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.settingsItem,
            index === settingsItems.length - 1 && styles.lastItem
          ]}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <View style={styles.itemContent}>
            <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}20` }]}>
              <Feather 
                name={item.icon as any} 
                size={20} 
                color={item.iconColor} 
              />
            </View>
            
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
          
          <Feather name="chevron-right" size={20} color="#d1d5db" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#171717',
  },
});
