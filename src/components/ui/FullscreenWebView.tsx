import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  html?: string;          
  uriFallback?: string;
  injectedJavaScript?: string; 
};

export default function FullscreenWebView({ html, uriFallback, injectedJavaScript }: Props) {
  const webRef = useRef<WebView>(null);

  const source = useMemo(() => {
    return html ? { html } : { uri: uriFallback || 'about:blank' };
  }, [html, uriFallback]);

  const userAgent = useMemo(() => 
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    []
  );

  const handleLoadEnd = useCallback(() => {
    if (injectedJavaScript && webRef.current) {
      setTimeout(() => {
        webRef.current?.injectJavaScript(injectedJavaScript);
      }, 100);
    }
  }, [injectedJavaScript]);

  const handleLoadStart = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webRef}
        originWhitelist={["*"]}
        source={source}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        bounces={false}
        allowFileAccess={true}
        allowsInlineMediaPlayback={true}
        mixedContentMode="compatibility"
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        cacheEnabled={false}
        incognito={false}
        userAgent={userAgent}
        injectedJavaScript={injectedJavaScript}
        // injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        onLoadEnd={handleLoadEnd}
        onLoadStart={handleLoadStart}
        style={styles.webview}
        androidLayerType="hardware"
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView HTTP error: ', nativeEvent);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  webview: { flex: 1 },

});