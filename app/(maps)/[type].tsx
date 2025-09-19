import { FullscreenWebView } from '@/components';
import { createCleanupJS, GREENMAP_CLEANUP_CONFIG, WINDY_CLEANUP_CONFIG } from '@/utils';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from "react";

export default function MapScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const { getMapHeader } = useHeader();

  const mapConfig = useMemo(() => {
    switch (type) {
      case 'greenmap':
        return {
          url: "https://greenmap.org/browse/maps/_/map-view?viewbox=103.65932432913326%2C15.487146341658786%2C110.36394077475477%2C18.53210128454853",
          cleanupConfig: GREENMAP_CLEANUP_CONFIG
        };
      case 'windy':
        return {
          url: "https://www.windy.com/-Temperature-temp?temp,10.833,106.611,5",
          cleanupConfig: WINDY_CLEANUP_CONFIG
        };
      default:
        return {
          url: "https://greenmap.org/browse/maps/_/map-view?viewbox=103.65932432913326%2C15.487146341658786%2C110.36394077475477%2C18.53210128454853",
          cleanupConfig: GREENMAP_CLEANUP_CONFIG
        };
    }
  }, [type]);

  const injectedJS = useMemo(() => createCleanupJS(mapConfig.cleanupConfig), [mapConfig.cleanupConfig]);

  return (
    <HeaderWrapper {...getMapHeader(type || 'greenmap')}>
      <FullscreenWebView
        uriFallback={mapConfig.url}
        injectedJavaScript={injectedJS}
      />
    </HeaderWrapper>
  );
}
