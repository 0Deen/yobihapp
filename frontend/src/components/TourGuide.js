import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent,
  Paper,
  useTheme
} from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const steps = [
  {
    label: 'Welcome to Mental Health Assessment',
    description: `This application helps assess potential mental health conditions based on various factors in a student's life. The assessment is for educational purposes only and not a substitute for professional diagnosis.`,
  },
  {
    label: 'Fill out the form',
    description:
      'Answer all questions honestly. The form collects information about your sleep patterns, academic performance, social interactions, and other factors that may influence mental health.',
  },
  {
    label: 'Get your assessment',
    description: `After submitting the form, you'll receive an assessment of potential mental health conditions based on your answers, along with recommendations for support and improvement.`,
  },
  {
    label: 'Explore features',
    description:
      'You can switch between light and dark mode using the icon in the top-right corner. The footer contains helpful resources for mental health support.',
  },
];

const TourGuide = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinish = () => {
    onClose();
    setActiveStep(0);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EmojiObjectsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5" component="div" fontWeight={600}>
            How to Use This App
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="subtitle1" fontWeight={600}>
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={index === steps.length - 1 ? handleFinish : handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
            <Typography>All steps completed - you're ready to use the app!</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
            <Button onClick={handleFinish} variant="contained" sx={{ mt: 1, mr: 1 }}>
              Get Started
            </Button>
          </Paper>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Skip Tour
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TourGuide;
