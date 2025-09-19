export * from './api';
export * from './map';

export interface WebViewProps {
  html?: string;
  uriFallback?: string;
  injectedJavaScript?: string;
}

export interface TabBarIconProps {
  name: string;
  color: string;
  focused?: boolean;
}
