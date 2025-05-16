import React from 'react';
import { Box, Typography, Link, Container, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import './MobileFooter.css';

const MobileFooter = () => {
  return (
    <div className="mobile-footer">
      <Container maxWidth="lg">
        <Divider sx={{ mb: 2 }} />

        <Typography variant="body2" color="#c9ada7" align="center" sx={{ mb: 1 }}>
          © {new Date().getFullYear()} Mental Health Assessment
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="#c9ada7" align="center" sx={{ fontSize: '0.8rem' }}>
            Made with
          </Typography>
          <FavoriteIcon sx={{ mx: 0.5, fontSize: 14, color: "#e07a5f" }} />
          <Typography variant="body2" color="#c9ada7" align="center" sx={{ fontSize: '0.8rem' }}>
            for better mental health
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
          <Link
            href="https://github.com/0Deen/YobraApp-mental-recommendation-"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontSize: '0.8rem',
              '&:hover': {
                color: 'rgba(100, 255, 218, 0.9)'
              }
            }}
          >
            <GitHubIcon sx={{ mr: 0.5, fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
              View on GitHub
            </Typography>
          </Link>
        </Box>

        <Typography variant="body2" color="#c9ada7" align="center" sx={{ fontSize: '0.75rem', mb: 1 }}>
          For educational purposes only
        </Typography>
      </Container>
    </div>
  );
};

export default MobileFooter;
