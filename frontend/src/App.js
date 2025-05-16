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

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  return (
    <ThemeProvider>
      <div className="app">
        {/* Particles background */}
        <div className="particles-container">
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            style={{ position: 'fixed', width: '100%', height: '100%', zIndex: -1 }}
            options={{
            background: {
              color: {
                value: "#0a192f",
              },
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: ["#64ffda", "#8892b0", "#a8b2d1", "#64ffda", "#8892b0"],
              },
              links: {
                enable: false,
              },
              collisions: {
                enable: false,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: false,
                speed: 2,
                straight: false,
                attract: {
                  enable: true,
                  rotate: {
                    x: 600,
                    y: 600
                  }
                }
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
                random: true,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
                random: true,
              },
              glow: {
                enable: true,
                color: "#64ffda",
                blur: 5,
              },
            },
            interactivity: {
              detect_on: "window",
              events: {
                onHover: {
                  enable: true,
                  mode: "bubble",
                  parallax: {
                    enable: true,
                    force: 100,
                    smooth: 5
                  }
                },
                onClick: {
                  enable: true,
                  mode: "push"
                },
                resize: true
              },
              modes: {
                bubble: {
                  distance: 250,
                  size: 10,
                  duration: 2,
                  opacity: 0.8,
                  speed: 3
                },
                grab: {
                  distance: 400,
                  links: {
                    opacity: 0
                  }
                },
                repulse: {
                  distance: 200,
                  duration: 0.4
                },
                push: {
                  quantity: 4
                },
                remove: {
                  quantity: 2
                }
              }
            },
            motion: {
              disable: false,
              reduce: {
                factor: 4,
                value: true
              }
            },
            detectRetina: true,
          }}
          />
        </div>

        {/* Header - Only show when welcome page is not visible */}
        {!showWelcome && <Header onInfoClick={handleInfoClick} />}

        {/* Tour Guide */}
        <TourGuide open={showTour} onClose={() => setShowTour(false)} />

        {/* Main Content */}
        {showWelcome ? (
          <WelcomePage onGetStarted={handleGetStarted} />
        ) : (
          <Container maxWidth="md" className="content-container">
            <Box className="glass-panel">
              {!result ? (
                <MentalHealthForm setResult={setResult} setFormData={setFormData} />
              ) : (
                <ResultDisplay result={result} formData={formData} onReset={handleReset} />
              )}
            </Box>
          </Container>
        )}

        {/* Footer - Conditionally render based on screen size */}
        {!showWelcome && (
          <>
            {/* Regular Footer (hidden on mobile via CSS) */}
            <div className="desktop-footer-container">
              <Footer />
            </div>

            {/* Mobile Footer (only visible on mobile via CSS) */}
            <div className="mobile-footer-container">
              <MobileFooter />
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
