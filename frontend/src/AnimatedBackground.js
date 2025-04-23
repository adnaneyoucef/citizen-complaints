import React from 'react';
import { Box, useTheme } from '@mui/material';

// Animated gradient background with administrative theme and animated geometric shapes
const AnimatedBackground = ({ children }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        top: 0,
        left: 0,
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(-45deg, #0a2342 0%, #181c1f 100%)'
          : 'linear-gradient(-45deg, #0a2342 0%, #5bc0f8 100%)',
        backgroundSize: '400% 400%',
        animation: 'muiGradientBG 12s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes muiGradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes adminShape1 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.18; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.28; }
        }
        @keyframes adminShape2 {
          0%, 100% { transform: translateX(0) scale(1); opacity: 0.14; }
          50% { transform: translateX(40px) scale(1.15); opacity: 0.23; }
        }
        @keyframes adminShape3 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.13; }
          50% { transform: translateY(40px) scale(1.08); opacity: 0.19; }
        }
      `}</style>

      {children}
    </Box>
  );
};

export default AnimatedBackground;
