import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { getTheme, ThemeName } from '../style/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../style/global';

const DEFAULT_THEME_NAME = "Light";
const THEME_LOCALSTORAGE_KEY = "book_store_theme";

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state = {
  themeName: DEFAULT_THEME_NAME as ThemeName,
  toggleTheme: () => {},
};

interface BookStoreThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider: React.FC<BookStoreThemeProviderProps> = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);

  const toggleTheme = () => {
    setThemeName(themeName === "Light" ? "dark" : "Light");
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, themeName === "Light" ? "dark" : "Light");
  };

  useEffect(() => {
    const savedThemeName = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName;
    setThemeName(savedThemeName || DEFAULT_THEME_NAME);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
