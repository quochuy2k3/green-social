import { useTheme } from '@/theme';
import { TextStyle } from 'react-native';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body1' | 'body2' | 'caption' | 'overline'
  | 'button' | 'label';

export type TypographyWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

export const getTypographyStyle = (
  variant: TypographyVariant,
  weight: TypographyWeight = 'regular'
): TextStyle => {
  const theme = useTheme();
  
  const typographyMap: Record<TypographyVariant, Partial<TextStyle>> = {
    h1: {
      fontSize: theme.text.size['3xl'],
      lineHeight: theme.text.lineHeight['3xl'],
      fontWeight: theme.text.weight.bold,
      fontFamily: theme.text.fontFamily.bold,
    },
    h2: {
      fontSize: theme.text.size['2xl'],
      lineHeight: theme.text.lineHeight['2xl'],
      fontWeight: theme.text.weight.bold,
      fontFamily: theme.text.fontFamily.bold,
    },
    h3: {
      fontSize: theme.text.size.xl,
      lineHeight: theme.text.lineHeight.xl,
      fontWeight: theme.text.weight.semibold,
      fontFamily: theme.text.fontFamily.semibold,
    },
    h4: {
      fontSize: theme.text.size.lg,
      lineHeight: theme.text.lineHeight.lg,
      fontWeight: theme.text.weight.semibold,
      fontFamily: theme.text.fontFamily.semibold,
    },
    h5: {
      fontSize: theme.text.size.base,
      lineHeight: theme.text.lineHeight.base,
      fontWeight: theme.text.weight.medium,
      fontFamily: theme.text.fontFamily.medium,
    },
    h6: {
      fontSize: theme.text.size.sm,
      lineHeight: theme.text.lineHeight.sm,
      fontWeight: theme.text.weight.medium,
      fontFamily: theme.text.fontFamily.medium,
    },
    body1: {
      fontSize: theme.text.size.base,
      lineHeight: theme.text.lineHeight.base,
      fontWeight: theme.text.weight.regular,
      fontFamily: theme.text.fontFamily.regular,
    },
    body2: {
      fontSize: theme.text.size.sm,
      lineHeight: theme.text.lineHeight.sm,
      fontWeight: theme.text.weight.regular,
      fontFamily: theme.text.fontFamily.regular,
    },
    caption: {
      fontSize: theme.text.size.xs,
      lineHeight: theme.text.lineHeight.xs,
      fontWeight: theme.text.weight.regular,
      fontFamily: theme.text.fontFamily.regular,
    },
    overline: {
      fontSize: theme.text.size['2xs'],
      lineHeight: theme.text.lineHeight['2xs'],
      fontWeight: theme.text.weight.medium,
      fontFamily: theme.text.fontFamily.medium,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    button: {
      fontSize: theme.text.size.base,
      lineHeight: theme.text.lineHeight.base,
      fontWeight: theme.text.weight.medium,
      fontFamily: theme.text.fontFamily.medium,
    },
    label: {
      fontSize: theme.text.size.sm,
      lineHeight: theme.text.lineHeight.sm,
      fontWeight: theme.text.weight.medium,
      fontFamily: theme.text.fontFamily.medium,
    },
  };

  const baseStyle = typographyMap[variant];
  
  // Override weight if specified
  if (weight !== 'regular') {
    return {
      ...baseStyle,
      fontWeight: theme.text.weight[weight],
      fontFamily: theme.text.fontFamily[weight],
    };
  }

  return baseStyle;
};

// Helper function to get font family by weight
export const getFontFamily = (weight: TypographyWeight = 'regular'): string => {
  const theme = useTheme();
  return theme.text.fontFamily[weight];
};

// Helper function to get font size
export const getFontSize = (size: '2xs' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl'): number => {
  const theme = useTheme();
  return theme.text.size[size];
};

// Helper function to get line height
export const getLineHeight = (size: '2xs' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl'): number => {
  const theme = useTheme();
  return theme.text.lineHeight[size];
};
