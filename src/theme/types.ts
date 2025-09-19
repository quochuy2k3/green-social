import { TextStyle } from 'react-native';

export type ThemeDimensions = {
  headerHeight: number;
  buttonHeight: {
    sm: number;
    base: number;
    lg: number;
    xl: number;
  };
  inputHeight: {
    sm: number;
    base: number;
    lg: number;
  };
};

export type ThemeColors = {
  brand100: string;
  brand90: string;
  brand80: string;
  brand70: string;
  brand60: string;
  brand50: string;
  brand40: string;
  brand30: string;
  brand20: string;
  brand10: string;

  disabledOthers: string;
  disabledBackground: string;

  neutral100: string;
  neutral90: string;
  neutral80: string;
  neutral70: string;
  neutral60: string;
  neutral50: string;
  neutral40: string;
  neutral30: string;
  neutral20: string;
  neutral10: string;

  error100: string;
  error90: string;
  error80: string;
  error70: string;
  error60: string;
  error50: string;
  error40: string;
  error30: string;
  error20: string;
  error10: string;

  warning100: string;
  warning90: string;
  warning80: string;
  warning70: string;
  warning60: string;
  warning50: string;
  warning40: string;
  warning30: string;
  warning20: string;
  warning10: string;

  success100: string;
  success90: string;
  success80: string;
  success70: string;
  success60: string;
  success50: string;
  success40: string;
  success30: string;
  success20: string;
  success10: string;

  special: string;

  black: string;
  white: string;
};

export type ThemeSpacing = {
  '2xs': number;
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
};

export type ThemeBorder = {
  radius: {
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    full: number;
  };
};

export type ThemeText = {
  size: {
    '2xs': number;
    xs: number;
    sm: number;
    base: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
    '5xl': number;
    '6xl': number;
    '7xl': number;
    '8xl': number;
  };
  lineHeight: {
    '2xs': number;
    xs: number;
    sm: number;
    base: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
    '5xl': number;
    '6xl': number;
    '7xl': number;
    '8xl': number;
  };
  weight: {
    light: TextStyle['fontWeight'];
    regular: TextStyle['fontWeight'];
    medium: TextStyle['fontWeight'];
    semibold: TextStyle['fontWeight'];
    bold: TextStyle['fontWeight'];
  };
  fontFamily: {
    light: string;
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
  };
};

export type Theme = {
  dimensions: ThemeDimensions;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  border: ThemeBorder;
  text: ThemeText;
};

export type ThemeConfig = {
  light: Theme;
  dark: Theme;
};

export type ThemeName = keyof ThemeConfig;
