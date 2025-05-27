import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage
  const storedTheme = localStorage.getItem('theme');
  const [mode, setMode] = useState(storedTheme || 'dark');

  // Toggle theme function
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  // Create theme based on mode
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#4a4e69' : '#9a8c98',
        light: mode === 'light' ? '#9a8c98' : '#c9ada7',
        dark: mode === 'light' ? '#22223b' : '#4a4e69',
        contrastText: '#fff',
      },
      secondary: {
