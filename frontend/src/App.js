import React, { useState, useCallback } from 'react';
import { Container, Box } from '@mui/material';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import MentalHealthForm from './components/MentalHealthForm';
import ResultDisplay from './components/ResultDisplay';
import WelcomePage from './components/WelcomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileFooter from './components/MobileFooter';
import TourGuide from './components/TourGuide';
import { ThemeProvider } from './theme/ThemeContext';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showTour, setShowTour] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // console.log(container);
  }, []);

  const handleReset = () => {
    setResult(null);
    setFormData(null);
  };

  const handleInfoClick = () => {
    setShowTour(true);
  };
