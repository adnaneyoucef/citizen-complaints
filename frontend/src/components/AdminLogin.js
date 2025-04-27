import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Alert, Stack } from '@mui/material';
import AnimatedBackground from './AnimatedBackground';

import { useTheme } from '@mui/material';

function AdminLogin() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      if (res.data.user.role !== 'admin') {
        setError('الدخول مخصص للمسؤول فقط');
        return;
      }
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch {
      setError('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <>
      <AnimatedBackground sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }} />
      <Box sx={{
        minHeight: '100vh',
        bgcolor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <Paper
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: 3,
          minWidth: 360,
          maxWidth: 420,
          width: '100%',
          mx: 'auto',
          boxShadow: '0 0 32px 0 rgba(39, 174, 96, 0.18), 0 2px 8px 0 rgba(0,0,0,0.08)',
          background: theme => theme.palette.mode === 'dark' ? 'rgba(24, 28, 31, 0.98)' : 'rgba(255, 255, 255, 0.97)',
        }}
        >
          <Stack spacing={2.5} alignItems="center">
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                fontWeight: 700,
                fontSize: 20,
                borderRadius: 2,
                py: 1.5,
                backgroundColor: '#27ae60',
                color: '#fff',
                boxShadow: 'none',
                width: '100%',
                maxWidth: 400,
                '&:hover': {
                  backgroundColor: '#219150',
                  color: '#fff',
                  boxShadow: 'none',
                },
              }}
            >
              منصة شكاوى المواطنين
            </Button>
            <Typography variant="h4" fontWeight={700} align="center" gutterBottom sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#183a5a' }}>
              دخول المسؤول
            </Typography>
            <Typography variant="body1" align="center" sx={{ color: theme.palette.mode === 'dark' ? '#bbb' : '#6b7a90' }}>
              الرجاء إدخال البريد الإلكتروني وكلمة المرور الخاصة بك
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <TextField
                  label="البريد الإلكتروني"
                  placeholder="example@gmail.com"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: theme.palette.mode === 'dark' ? '#23272a' : '#f5f6fa',
                      color: theme.palette.mode === 'dark' ? '#f5f6fa' : '#23272a',
                    },
                    '& .MuiOutlinedInput-input': {
                      color: theme.palette.mode === 'dark' ? '#f5f6fa' : '#23272a',
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.mode === 'dark' ? '#bbb' : '#6b7a90',
                      fontWeight: 500,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#444' : '#e0e3e7',
                    }
                  }}
                />
                <TextField
                  label="كلمة المرور"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: theme.palette.mode === 'dark' ? '#23272a' : '#f5f6fa',
                      color: theme.palette.mode === 'dark' ? '#f5f6fa' : '#23272a',
                    },
                    '& .MuiOutlinedInput-input': {
                      color: theme.palette.mode === 'dark' ? '#f5f6fa' : '#23272a',
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.mode === 'dark' ? '#bbb' : '#6b7a90',
                      fontWeight: 500,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#444' : '#e0e3e7',
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    py: 1.7,
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ecc71' : '#d8f5c7',
                    color: theme.palette.mode === 'dark' ? '#fff' : '#183a5a',
                    boxShadow: 'none',
                    border: '2px solid transparent',
                    '&:hover': {
                      textShadow: '0 0 3px #27ae60',
                      backgroundColor: theme => theme.palette.mode === 'dark' ? '#27ae60' : '#c2eeba',
                      border: theme => theme.palette.mode === 'dark' ? '2px solid #fff' : '2px solid #27ae60',
                    },
                    '&:active, &:focus-visible': {
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 0 0 4px rgba(46, 204, 113, 0.28)'
                        : '0 0 0 4px rgba(216, 245, 199, 0.45)'
                    }
                  }}
                >
                  دخول
                </Button>
                {error && <Alert severity="error">{error}</Alert>}
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}

export default AdminLogin;
