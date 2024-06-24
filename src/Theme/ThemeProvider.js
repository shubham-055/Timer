import React, { createContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  const dynamicColors = {
  backgroundColor: isDarkMode ? '#1c1c1e' : '#F0F0F0',
  textColor: isDarkMode ? '#ffffff' : '#000000',
  taskContainerColor: isDarkMode ? '#2c2c2e' : '#ffffff',
  deleteSwipeColor: isDarkMode ? '#ff3b30' : '#EF4B4B',
  doneSwipeColor: isDarkMode ? '#2c2c2e' : '#ffffff',
  completedColor: isDarkMode ? '#3cbdc9' : '#3cbdc9',
  };

  return (
    <ColorContext.Provider value={{ isDarkMode, setIsDarkMode, dynamicColors }}>
      {children}
    </ColorContext.Provider>
  );
};