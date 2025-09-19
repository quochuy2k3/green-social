import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { themes } from "./themes";
import { Theme, ThemeName } from "./types";

export * from "./types";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (themeName: ThemeName) => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: themes.light,
  setTheme: () => {},
});

export type ThemeProviderProps = {
  children: React.ReactNode;
  theme: ThemeName;
};

export function useTheme() {
  const context = React.useContext(ThemeContext);
  return context?.theme;
}

export function makeStyles<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
  PropsT
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>(fn: (theme: Theme, props: PropsT) => T & StyleSheet.NamedStyles<any>) {
  return (props: PropsT) => {
    const theme = useTheme();
    return useMemo(() => StyleSheet.create(fn(theme, props)), [theme, props]);
  };
}

export default function ThemeProvider({ children, theme }: ThemeProviderProps): React.ReactElement {
  const [themeName, setThemeName] = React.useState(theme);
  return React.createElement(
    ThemeContext.Provider,
    {
      value: {
        theme: themes[themeName],
        setTheme: setThemeName,
      },
    },
    children
  );
}