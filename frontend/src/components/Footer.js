import React from 'react';
import { Box, Typography, Link, Container, Divider, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css'; // Import custom CSS for footer

const Footer = () => {
  const theme = useTheme();

  return (
    <footer className="app-footer">
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="#f2e9e4" gutterBottom>
              YobraApp (Mental Health Assessment)
            </Typography>
            <Typography variant="body2" color="#c9ada7">
              A tool to help assess mental health conditions and provide recommendations.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="#f2e9e4" gutterBottom>
              Resources
            </Typography>
            <Link href="https://www.who.int/health-topics/mental-health" target="_blank" color="#c9ada7" sx={{ display: 'block', mb: 1 }}>
              WHO Mental Health
            </Link>
            <Link href="https://mental360.or.ke/" target="_blank" color="#c9ada7" sx={{ display: 'block', mb: 1 }}>
              Mental 360
            </Link>
            <Link href="https://mental.health.go.ke/" target="_blank" color="#c9ada7" sx={{ display: 'block' }}>
              MoH Kenya
            </Link>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="#f2e9e4" gutterBottom>
              Disclaimer
            </Typography>
            <Typography variant="body2" color="#c9ada7" sx={{ maxWidth: 300 }}>
              This tool is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body2" color="#c9ada7" align="center">
            Made with
          </Typography>
          <FavoriteIcon sx={{ mx: 0.5, fontSize: 16, color: "#e07a5f" }} />
          <Typography variant="body2" color="#c9ada7" align="center">
            for a better mental health future
          </Typography>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link
            href="https://github.com/0Deen/yobihapp"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'rgba(100, 255, 218, 0.9)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <GitHubIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">
              View on GitHub
            </Typography>
          </Link>
        </Box>

        <Typography variant="body2" color="#c9ada7" align="center" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} YobraApp(Mental Health Assessment)
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
