import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Alert, Stack } from '@mui/material';
import AnimatedBackground from '../AnimatedBackground';

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
    <Box sx={{
      minHeight: '100vh',
      bgcolor: theme.palette.mode === 'dark' ? '#181c1f' : '#f5f8f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 6
    }}>
      <Paper sx={{
        p: { xs: 3, sm: 5 },
        borderRadius: 2,
        maxWidth: 480,
        minHeight: 600,
        width: '100%',
        bgcolor: theme.palette.mode === 'dark' ? '#23272a' : '#fff',
        boxShadow: 'none',
        mx: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}>
        <Box sx={{ position: 'relative', width: '100%' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/')}
            sx={{
              position: 'absolute',
              left: '15%',
              top: 0,
              transform: 'translate(5%, -120%)',
              fontSize: 20,
              fontWeight: 700,
              py: 1.7,
              borderRadius: 2,
              backgroundColor: theme.palette.mode === 'dark' ? '#2ecc71' : '#d8f5c7',
              color: theme.palette.mode === 'dark' ? '#fff' : '#183a5a',
              boxShadow: 'none',
              border: '2px solid transparent',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#27ae60' : '#c2eeba',
                boxShadow: 'none',
                border: theme.palette.mode === 'dark' ? '2px solid #fff' : '2px solid #27ae60'
              }
            }}
          >
            منصة شكاوى المواطنين
          </Button>
          <Stack spacing={3} alignItems="center" sx={{ flexGrow: 1, width: '100%', justifyContent: 'center' }}>
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
                      backgroundColor: theme.palette.mode === 'dark' ? '#27ae60' : '#c2eeba',
                      boxShadow: 'none',
                      border: theme.palette.mode === 'dark' ? '2px solid #fff' : '2px solid #27ae60'
                    }
                  }}
                >
                  دخول
                </Button>
                {error && <Alert severity="error">{error}</Alert>}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default AdminLogin;
