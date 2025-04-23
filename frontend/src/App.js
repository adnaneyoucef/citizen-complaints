import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComplaintForm from './components/ComplaintForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import FrontendLanding from './components/FrontendLanding';
import ThemeModeProvider from './ThemeContext';
import ModeSwitch from './ModeSwitch';
import { CssBaseline, Box } from '@mui/material';

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ position: 'fixed', top: 10, right: 10, zIndex: 1300 }}>
          <ModeSwitch />
        </Box>
        <Routes>
          <Route path="/" element={<FrontendLanding />} />
          <Route path="/complaint" element={<ComplaintForm />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeModeProvider>
  );
}

export default App;
