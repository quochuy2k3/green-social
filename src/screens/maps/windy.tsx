import { FullscreenWebView } from '@/components';
import { createCleanupJS, WINDY_CLEANUP_CONFIG } from '@/utils';
import React, { useMemo } from "react";

export default function WindyScreen() {
  const windyUrl = "https://www.windy.com/?21.0245,105.8412,5";

  const injectedWindyJS = useMemo(() => createCleanupJS(WINDY_CLEANUP_CONFIG), []);

  return (
    <FullscreenWebView
      uriFallback={windyUrl}
      injectedJavaScript={injectedWindyJS}
    />
  );
}
