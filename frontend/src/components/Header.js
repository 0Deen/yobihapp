import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
  useTheme as useMuiTheme
} from '@mui/material';
import { useTheme } from '../theme/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import InfoIcon from '@mui/icons-material/Info';
import logo from '../assets/logo.svg';

const Header = ({ onInfoClick }) => {
  const { mode, toggleTheme } = useTheme();
  const theme = useMuiTheme();

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(8px)',
        backgroundColor: mode === 'light'
          ? 'rgba(255, 255, 255, 0.3)'
          : 'rgba(18, 18, 18, 0.3)',
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar sx={{ minHeight: { xs: '56px', sm: '64px' }, px: { xs: 1, sm: 2 } }}>
        <Box
          component="img"
          src={logo}
          alt="Mental Health Assessment Logo"
          sx={{
            height: { xs: 35, sm: 45 },
            mr: { xs: 1, sm: 2 },
            filter: mode === 'light' ? 'drop-shadow(0 0 2px #4a4e69)' : 'drop-shadow(0 0 3px #64ffda)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              filter: mode === 'light' ? 'drop-shadow(0 0 3px #4a4e69)' : 'drop-shadow(0 0 5px #64ffda)',
            }
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: '0.5px',
            fontSize: { xs: '1.1rem', sm: '1.3rem' },
            background: mode === 'light'
              ? 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)'
              : 'linear-gradient(90deg, #64ffda 0%, #88a4ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: mode === 'light' 
              ? '0 0 2px rgba(69, 104, 220, 0.2)' 
              : '0 0 2px rgba(100, 255, 218, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              letterSpacing: '0.7px',
              background: mode === 'light'
                ? 'linear-gradient(90deg, #b06ab3 0%, #4568dc 100%)'
                : 'linear-gradient(90deg, #88a4ff 0%, #64ffda 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }
          }}
        >
          YobraApp
        </Typography>

        <Tooltip title="Learn how to use this app">
          <IconButton
            color="inherit"
            onClick={onInfoClick}
            sx={{ mr: 1 }}
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
