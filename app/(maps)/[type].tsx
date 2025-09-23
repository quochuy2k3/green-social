import { FullscreenWebView } from '@/components';
import { MapsHeader } from '@/components/ui';
import { createCleanupJS, GREENMAP_CLEANUP_CONFIG, WINDY_CLEANUP_CONFIG } from '@/utils';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from "react";
import { View } from 'react-native';

export default function MapScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();

  const mapConfig = useMemo(() => {
    switch (type) {
      case 'greenmap':
        return {
          url: "https://greenmap.org/browse/maps/_/map-view?viewbox=103.65932432913326%2C15.487146341658786%2C110.36394077475477%2C18.53210128454853",
          cleanupConfig: GREENMAP_CLEANUP_CONFIG,
          title: "Green Map"
        };
      case 'windy':
        return {
          url: "https://www.windy.com/-Temperature-temp?temp,10.833,106.611,5",
          cleanupConfig: WINDY_CLEANUP_CONFIG,
          title: "Temperature Map"
        };
      default:
        return {
          url: "https://greenmap.org/browse/maps/_/map-view?viewbox=103.65932432913326%2C15.487146341658786%2C110.36394077475477%2C18.53210128454853",
          cleanupConfig: GREENMAP_CLEANUP_CONFIG,
          title: "Green Map"
        };
    }
  }, [type]);

  const injectedJS = useMemo(() => createCleanupJS(mapConfig.cleanupConfig), [mapConfig.cleanupConfig]);

  return (
    <View style={{ flex: 1 }}>
      <MapsHeader
        title={mapConfig.title}
        subtitle={type === 'greenmap' ? 'Bản đồ môi trường với viewbox Việt Nam' : 'Bản đồ nhiệt độ theo từng địa phương'}
        onBackPress={() => {
          router.back();
        }}
    
      />
      <FullscreenWebView
        uriFallback={mapConfig.url}
        injectedJavaScript={injectedJS}
      />
    </View>
  );
}
