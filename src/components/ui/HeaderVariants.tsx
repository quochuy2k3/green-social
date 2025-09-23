import React from 'react';
import { CustomHeader } from './CustomHeader';

// Pre-configured header variants for easy use

export const HomeHeader: React.FC<{ onNotificationPress?: () => void }> = ({ 
  onNotificationPress 
}) => (
  <CustomHeader
    title="🌱 Green Social"
    subtitle="Kết nối với thiên nhiên và cộng đồng"
    variant="gradient"
    rightIcon="bell"
    onRightPress={onNotificationPress}
  />
);

export const MapsHeader: React.FC<{ 
  title: string; 
  subtitle?: string; 
  onBackPress?: () => void;
  onMenuPress?: () => void;
}> = ({ title, subtitle, onBackPress, onMenuPress }) => (
  <CustomHeader
    title={title}
    subtitle={subtitle}
    variant="glass"
    showBackButton={true}
  />
);

export const ProfileHeader: React.FC<{ 
  title: string; 
  onBackPress?: () => void;
  onSettingsPress?: () => void;
}> = ({ title, onBackPress, onSettingsPress }) => (
  <CustomHeader
    title={title}
    variant="solid"
    showBackButton={true}
    rightIcon="settings"
    onRightPress={onSettingsPress}
  />
);

export const StoreHeader: React.FC<{ 
  onBackPress?: () => void;
  onCartPress?: () => void;
}> = ({ onBackPress, onCartPress }) => (
  <CustomHeader
    title="🛍️ Cửa hàng"
    subtitle="Mua sắm thân thiện với môi trường"
    variant="gradient"
    showBackButton={true}
    rightIcon="shopping-cart"
    onRightPress={onCartPress}
  />
);

export const CommunityHeader: React.FC<{ 
  onBackPress?: () => void;
  onSearchPress?: () => void;
}> = ({ onBackPress, onSearchPress }) => (
  <CustomHeader
    title="👥 Cộng đồng"
    subtitle="Kết nối với những người cùng chí hướng"
    variant="glass"
    showBackButton={true}
    rightIcon="search"
    onRightPress={onSearchPress}
  />
);
