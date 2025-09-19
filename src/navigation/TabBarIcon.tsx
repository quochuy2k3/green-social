import { TabBarIconProps } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';

export default function TabBarIcon({ name, color, focused }: TabBarIconProps) {
  return (
    <Feather 
      size={24} 
      style={{ 
        marginBottom: -2,
        transform: focused ? [{ scale: 1.1 }] : [{ scale: 1 }],
      }} 
      name={name as any}
      color={color}
    />
  );
}
