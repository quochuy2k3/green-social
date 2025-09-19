import { Tabs } from 'expo-router';
import React from 'react';

import { useClientOnlyValue, useColorScheme } from '@/hooks';
import { TabBarIcon } from '@/navigation';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#34d399', 
        tabBarInactiveTintColor: '#a3a3a3', 
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 88,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '700',
          color: '#171717',
        },
      }}>
    
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bản đồ',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="map" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Cộng đồng',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="users" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Cửa hàng',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="shopping-bag" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Hồ sơ',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="user" color={color} focused={focused} />,
        }}
      />

    </Tabs>
  );
}