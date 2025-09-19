import { FullscreenWebView } from '@/components';
import { createCleanupJS, GREENMAP_CLEANUP_CONFIG } from '@/utils';
import React, { useMemo } from "react";

export default function GreenMapScreen() {
  const greenMapUrl =
    "https://greenmap.org/browse/maps/_/map-view?viewbox=103.65932432913326%2C15.487146341658786%2C110.36394077475477%2C18.53210128454853";

  const injectedGreenMapJS = useMemo(() => createCleanupJS(GREENMAP_CLEANUP_CONFIG), []);

  return (
    <FullscreenWebView
      uriFallback={greenMapUrl}
      injectedJavaScript={injectedGreenMapJS}
    />
  );
}
