import React from 'react';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';

function FrontendLanding() {
  const navigate = useNavigate();

  return (
    <>
      <AnimatedBackground />
      <Box
      sx={{
        bgcolor: theme => theme.palette.mode === 'dark' ? '#181c1f' : '#f5f8f9',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: { xs: 'flex-start', md: 'center' },
        px: 1,
        py: { xs: 2, md: 0 }
      }}
    >
      <Paper
        sx={{
          overflowX: 'auto',
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          minWidth: 270,
          maxWidth: 420,
          width: '100%',
          mx: 'auto',
          boxShadow: '0 0 32px 0 rgba(39, 174, 96, 0.18), 0 2px 8px 0 rgba(0,0,0,0.08)',
          background: theme => theme.palette.mode === 'dark' ? 'rgba(24, 28, 31, 0.98)' : 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(12px) saturate(1.3)',
          border: '1.5px solid',
          borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(39,174,96,0.13)' : 'rgba(39,174,96,0.09)',
          transition: 'background 0.5s, box-shadow 0.5s',
        }}
      >
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
                  textShadow: '0 0 3px #27ae60',
                  backgroundColor: theme => theme.palette.mode === 'dark' ? '#27ae60' : '#c2eeba',
                  border: theme => theme.palette.mode === 'dark' ? '2px solid #fff' : '2px solid #27ae60',
                  '&:active, &:focus-visible': {
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 0 0 4px rgba(46, 204, 113, 0.28)'
                      : '0 0 0 4px rgba(216, 245, 199, 0.45)'
                  }
                },
                transition: 'background 0.2s, border 0.2s'
              }}
              onClick={() => navigate('/complaint/form')}
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
                  textShadow: '0 0 3px #27ae60',
                  boxShadow: 'none',
                  '&:active, &:focus-visible': { boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.25)' },
                  backgroundColor: theme => theme.palette.mode === 'dark' ? '#23272a' : '#e5ffe5',
                  boxShadow: 'none',
                  border: theme => theme.palette.mode === 'dark' ? '2px solid #fff' : '2px solid #27ae60',
                  textShadow: '0 0 3px #27ae60',
                  boxShadow: 'none',
                  '&:active, &:focus-visible': { boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.25)' }
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
    </>
  );
}

export default FrontendLanding;
