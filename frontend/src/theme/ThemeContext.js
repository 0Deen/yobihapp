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
        main: mode === 'light' ? '#c9ada7' : '#f2e9e4',
        light: mode === 'light' ? '#f2e9e4' : '#fff',
        dark: mode === 'light' ? '#9a8c98' : '#c9ada7',
        contrastText: mode === 'light' ? '#22223b' : '#22223b',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#22223b' : '#f2e9e4',
        secondary: mode === 'light' ? '#4a4e69' : '#c9ada7',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 24px',
            boxShadow: mode === 'light' 
              ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
              : '0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'light' 
                ? '0 6px 10px rgba(0, 0, 0, 0.15)' 
                : '0 6px 10px rgba(0, 0, 0, 0.4)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light' 
              ? '0 8px 16px rgba(0, 0, 0, 0.1)' 
              : '0 8px 16px rgba(0, 0, 0, 0.4)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  // Provide the theme context
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
