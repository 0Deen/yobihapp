import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RecommendIcon from '@mui/icons-material/Recommend';
import WarningIcon from '@mui/icons-material/Warning';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

// Map conditions to severity levels and colors
const conditionData = {
  'Depression': { severity: 8, color: '#ff6384', icon: <SentimentVeryDissatisfiedIcon /> },
  'Anxiety': { severity: 7, color: '#ff9f40', icon: <WarningIcon /> },
  'Stress': { severity: 6, color: '#ffcd56', icon: <WarningIcon /> },
  'ADHD': { severity: 6, color: '#4bc0c0', icon: <PsychologyIcon /> },
  'PTSD': { severity: 8, color: '#f66d9b', icon: <LocalHospitalIcon /> },
  'OCD': { severity: 7, color: '#cc65fe', icon: <PsychologyIcon /> },
  'Bipolar Disorder': { severity: 8, color: '#f77825', icon: <LocalHospitalIcon /> },
  'Eating Disorder': { severity: 7, color: '#36a2eb', icon: <LocalHospitalIcon /> },
  'Adjustment Disorder': { severity: 5, color: '#9966ff', icon: <PsychologyIcon /> },
  'Normal': { severity: 1, color: '#4bc0c0', icon: <MoodIcon /> }
};

// Split recommendation text into bullet points
const splitRecommendation = (text) => {
  return text.split('. ').filter(item => item.trim() !== '').map(item =>
    item.endsWith('.') ? item : `${item}.`
  );
};

const ResultDisplay = ({ result, formData, onReset }) => {
  const theme = useTheme();

  if (!result) return null;

  // Handle both formats: string recommendation or array of recommendations
  const recommendationPoints = Array.isArray(result.recommendations)
    ? result.recommendations
    : (result.recommendation ? splitRecommendation(result.recommendation) : ["Continue maintaining your healthy lifestyle."]);

  const conditionInfo = conditionData[result.condition] || {
    severity: 5,
    color: '#4bc0c0',
    icon: <PsychologyIcon />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Chip
            icon={conditionInfo.icon}
            label={result.condition}
            color={result.condition === 'Normal' ? 'success' : 'primary'}
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              py: { xs: 2, sm: 3 },
              px: { xs: 1, sm: 2 },
              mb: 3,
              '& .MuiChip-icon': {
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                marginRight: { xs: '4px', sm: '8px' }
              }
            }}
          />
        </motion.div>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight={600}
          color="text.primary"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
        >
          Assessment Results
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Based on your responses, we've generated the following assessment and recommendations.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Condition Card */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card
              elevation={3}
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(74, 78, 105, 0.2) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 0 80px rgba(100, 255, 218, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, rgba(100, 255, 218, 0.8), rgba(74, 78, 105, 0.8))',
                  zIndex: 1
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PsychologyIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h5" component="h2" fontWeight={600}>
                    Condition Analysis
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      border: `8px solid ${conditionInfo.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(${conditionInfo.color.replace('rgb(', '').replace(')', '')}, 0.05) 100%)`,
                      boxShadow: `0 0 30px rgba(${conditionInfo.color.replace('rgb(', '').replace(')', '')}, 0.2)`,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -8,
                        left: -8,
                        right: -8,
                        bottom: -8,
                        borderRadius: '50%',
                        border: `2px solid rgba(255, 255, 255, 0.2)`,
                        animation: 'pulse 2s infinite'
                      },
                      '@keyframes pulse': {
                        '0%': {
                          transform: 'scale(1)',
                          opacity: 0.8
                        },
                        '50%': {
                          transform: 'scale(1.05)',
                          opacity: 0.5
                        },
                        '100%': {
                          transform: 'scale(1)',
                          opacity: 0.8
                        }
                      }
                    }}
                  >
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{
                        fontWeight: 'bold',
                        color: conditionInfo.color
                      }}
                    >
                      {conditionInfo.severity}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body1" paragraph>
                  {result.condition === 'Normal'
                    ? 'Your responses indicate a healthy mental state. Continue maintaining good habits and self-care practices.'
                    : `Your responses indicate potential signs of ${result.condition.toLowerCase()}. This is not a clinical diagnosis, but suggests areas that may benefit from attention.`
                  }
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Severity Level:
                  </Typography>
                  <Typography variant="body2">
                    {conditionInfo.severity <= 3
                      ? 'Mild - Minimal impact on daily functioning'
                      : conditionInfo.severity <= 6
                        ? 'Moderate - Some impact on daily functioning'
                        : 'Significant - Consider professional consultation'
                    }
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recommendations Card */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card
              elevation={3}
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(74, 78, 105, 0.2) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 0 80px rgba(100, 255, 218, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, rgba(100, 255, 218, 0.8), rgba(74, 78, 105, 0.8))',
                  zIndex: 1
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <RecommendIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h5" component="h2" fontWeight={600}>
                    Recommendations
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <List>
                  {recommendationPoints.map((point, index) => (
                    <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={point}
                        primaryTypographyProps={{
                          variant: 'body1',
                          color: 'text.primary'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Important Note:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This assessment is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Contributing Factors Card */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card
              elevation={3}
              sx={{
                background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(74, 78, 105, 0.2) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 0 80px rgba(100, 255, 218, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, rgba(100, 255, 218, 0.8), rgba(74, 78, 105, 0.8))',
                  zIndex: 1
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PsychologyIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h5" component="h2" fontWeight={600}>
                    Contributing Factors
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.05) 0%, rgba(74, 78, 105, 0.1) 100%)',
                        borderRadius: 2,
                        height: '100%',
                        border: '1px solid rgba(100, 255, 218, 0.1)',
                        boxShadow: 'inset 0 0 20px rgba(100, 255, 218, 0.03)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 'inset 0 0 30px rgba(100, 255, 218, 0.05), 0 5px 15px rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <NightsStayIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                        <Typography variant="subtitle1" fontWeight={600}>
                          Sleep
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {formData?.sleep_hours < 6
                          ? 'Insufficient sleep can impact mental health.'
                          : formData?.sleep_hours > 9
                            ? 'Excessive sleep may indicate underlying issues.'
                            : 'Your sleep duration is within a healthy range.'}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.05) 0%, rgba(74, 78, 105, 0.1) 100%)',
                        borderRadius: 2,
                        height: '100%',
                        border: '1px solid rgba(100, 255, 218, 0.1)',
                        boxShadow: 'inset 0 0 20px rgba(100, 255, 218, 0.03)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 'inset 0 0 30px rgba(100, 255, 218, 0.05), 0 5px 15px rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <SchoolIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                        <Typography variant="subtitle1" fontWeight={600}>
                          Academic
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {formData?.academic_performance === 'Poor'
                          ? 'Academic struggles can contribute to mental stress.'
                          : formData?.academic_performance === 'Average'
                            ? 'Balanced academic performance is positive.'
                            : 'Strong academic performance is a protective factor.'}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.05) 0%, rgba(74, 78, 105, 0.1) 100%)',
                        borderRadius: 2,
                        height: '100%',
                        border: '1px solid rgba(100, 255, 218, 0.1)',
                        boxShadow: 'inset 0 0 20px rgba(100, 255, 218, 0.03)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 'inset 0 0 30px rgba(100, 255, 218, 0.05), 0 5px 15px rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <SportsBasketballIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                        <Typography variant="subtitle1" fontWeight={600}>
                          Physical Activity
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {formData?.sports_participation === 'Yes'
                          ? 'Regular physical activity benefits mental health.'
                          : 'Consider increasing physical activity for better mental health.'}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.05) 0%, rgba(74, 78, 105, 0.1) 100%)',
                        borderRadius: 2,
                        height: '100%',
                        border: '1px solid rgba(100, 255, 218, 0.1)',
                        boxShadow: 'inset 0 0 20px rgba(100, 255, 218, 0.03)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 'inset 0 0 30px rgba(100, 255, 218, 0.05), 0 5px 15px rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <MoodIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                        <Typography variant="subtitle1" fontWeight={600}>
                          Social Support
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {formData?.has_close_friends === 'Yes'
                          ? 'Having close friends provides important social support.'
                          : 'Building social connections can improve mental wellbeing.'}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ width: '100%', maxWidth: '300px' }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onReset}
            fullWidth={window.innerWidth < 600}
            sx={{
              px: { xs: 2, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.8) 0%, rgba(74, 78, 105, 0.9) 100%)',
              border: 'none',
              position: 'relative',
              overflow: 'hidden',
              color: '#0a192f',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                transition: '0.5s'
              },
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 7px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(100, 255, 218, 0.5)',
                background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.9) 0%, rgba(74, 78, 105, 1) 100%)'
              },
              '&:hover::before': {
                left: '100%'
              },
              '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            Take Another Assessment
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default ResultDisplay;
