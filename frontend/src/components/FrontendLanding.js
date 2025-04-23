import React from 'react';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../AnimatedBackground';

function FrontendLanding() {
  const navigate = useNavigate();

  return (
    <AnimatedBackground>
      <Box sx={{ minHeight: '100vh', bgcolor: theme => theme.palette.mode === 'dark' ? '#181c1f' : '#f5f8f9', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 2, maxWidth: 420, width: '100%', bgcolor: theme => theme.palette.mode === 'dark' ? '#23272a' : '#fff', boxShadow: 'none', mx: 2 }}>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4" fontWeight={700} align="center" gutterBottom sx={{ color: theme => theme.palette.mode === 'dark' ? '#fff' : '#183a5a' }}>
              منصة شكاوى المواطنين
            </Typography>
            <Typography variant="body1" align="center" sx={{ color: theme => theme.palette.mode === 'dark' ? '#bbb' : '#6b7a90' }}>
              مرحبًا بك في منصة تقديم الشكاوى. يمكنك إرسال شكوى أو تسجيل الدخول كمسؤول.
            </Typography>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                  py: 1.7,
                  borderRadius: 2,
                  backgroundColor: theme => theme.palette.mode === 'dark' ? '#2ecc71' : '#d8f5c7',
                  color: theme => theme.palette.mode === 'dark' ? '#fff' : '#183a5a',
                  boxShadow: 'none',
                  border: '2px solid transparent',
                  '&:hover': {
                    backgroundColor: theme => theme.palette.mode === 'dark' ? '#27ae60' : '#c2eeba',
                    boxShadow: 'none',
                    border: theme => theme.palette.mode === 'dark' ? '2px solid #fff' : '2px solid #27ae60'
                  }
                }}
                onClick={() => navigate('/complaint')}
              >
                إرسال شكوى
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 18,
                  backgroundColor: theme => theme.palette.mode === 'dark' ? '#23272a' : '#f5f6fa',
                  color: theme => theme.palette.mode === 'dark' ? '#fff' : '#183a5a',
                  boxShadow: 'none',
                  border: '2px solid transparent',
                  '&:hover': {
                    backgroundColor: theme => theme.palette.mode === 'dark' ? '#23272a' : '#e5ffe5',
                    boxShadow: 'none',
                    border: theme => theme.palette.mode === 'dark' ? '2px solid #fff' : '2px solid #27ae60'
                  }
                }}
                onClick={() => navigate('/admin/login')}
              >
                دخول المسؤول
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </AnimatedBackground>
  );
}

export default FrontendLanding;
