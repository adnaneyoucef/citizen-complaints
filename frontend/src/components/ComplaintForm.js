import React, { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Alert, Stack } from '@mui/material';

function ComplaintForm() {
  const [complaints, setComplaints] = useState([]);
  const [checkingDuplicate, setCheckingDuplicate] = useState(true);
  const [isDuplicate, setIsDuplicate] = useState(false);
  // ...existing state hooks...
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Common disposable/fake email domains (expand as needed)
  const disposableDomains = [
    'mailinator.com', '10minutemail.com', 'guerrillamail.com', 'yopmail.com',
    'trashmail.com', 'tempmail.com', 'fakeinbox.com', 'getnada.com'
  ];

  // Check if email is disposable
  function isDisposableEmail(email) {
    const domain = email.split('@')[1]?.toLowerCase();
    return disposableDomains.some(d => domain === d);
  }

  // Form validation function
  function hasRepeatedFields() {
    // Compare all filled fields for repeated values (case-insensitive, trimmed)
    const values = [name, email, title, type, details]
      .map(v => v.trim().toLowerCase())
      .filter(v => v.length > 0);
    const seen = new Set();
    for (const v of values) {
      if (seen.has(v)) return true;
      seen.add(v);
    }
    return false;
  }

  function isFormValid() {
    return (
      name.trim().length > 0 &&
      title.trim().length > 0 &&
      type.trim().length > 0 &&
      emailRegex.test(email.trim()) &&
      !isDisposableEmail(email.trim()) &&
      !hasRepeatedFields()
    );
  }

  // Fetch all complaints on mount
  React.useEffect(() => {
    setCheckingDuplicate(true);
    axios.get('http://localhost:5000/api/complaints')
      .then(res => setComplaints(res.data))
      .catch(() => setComplaints([]))
      .finally(() => setCheckingDuplicate(false));
  }, []);

  // Check for duplicate complaint
  React.useEffect(() => {
    if (name && email && title && type && complaints.length > 0) {
      // Block if a complaint with same name, email, title, and type exists in the dashboard
      const found = complaints.some(c =>
        c.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        c.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        c.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        c.type.trim().toLowerCase() === type.trim().toLowerCase()
      );
      setIsDuplicate(found);
    } else {
      setIsDuplicate(false);
    }
  }, [name, email, title, type, complaints]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('title', title);
      formData.append('type', type);
      formData.append('details', details);
      if (file) formData.append('attachment', file);
      await axios.post('http://localhost:5000/api/complaints', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(true);
      setName('');
      setEmail('');
      setTitle('');
      setType('');
      setDetails('');
      setFile(null);
    } catch (err) {
      setError('حدث خطأ. حاول مرة أخرى.');
    }
  };

  return (
    <>
      <AnimatedBackground sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }} />
      <Box
        sx={{
          bgcolor: 'transparent',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: { xs: 'flex-start', md: 'center' },
          px: 1,
          py: { xs: 2, md: 0 },
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        
        <Paper
          sx={{
            overflowX: 'auto',
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            minWidth: 360,
            maxWidth: 480,
            width: '100%',
            mx: 'auto',
            boxShadow: '0 0 32px 0 rgba(39, 174, 96, 0.18), 0 2px 8px 0 rgba(0,0,0,0.08)',
            background: theme => theme.palette.mode === 'dark' ? 'rgba(24, 28, 31, 0.98)' : 'rgba(255, 255, 255, 0.97)',
            backdropFilter: 'blur(12px) saturate(1.3)',
            border: '1.5px solid',
            borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(39,174,96,0.13)' : 'rgba(39,174,96,0.09)',
            transition: 'background 0.5s, box-shadow 0.5s',
            zIndex: 1,
            position: 'relative',
            maxHeight: { xs: 'none', md: 'calc(100vh - 32px)' },
            overflowY: { xs: 'visible', md: 'auto' }
          }}
        >
          <Stack spacing={3} alignItems="center" sx={{ width: '100%' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/')}
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
                },
                '&:active, &:focus-visible': {
                  boxShadow: theme => theme.palette.mode === 'dark'
                    ? '0 0 0 4px rgba(46, 204, 113, 0.28)'
                    : '0 0 0 4px rgba(216, 245, 199, 0.45)'
                }
              }}
            >
              منصة شكاوى المواطنين
            </Button>

          <Typography variant="h4" fontWeight={700} align="center" gutterBottom sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#183a5a' }}>
            نموذج الشكوى
          </Typography>
          <Typography variant="body1" align="center" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#bbb' : '#6b7a90' }}>
            الرجاء إدخال بيانات الشكوى بدقة
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <TextField
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
                label="الاسم"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
              <TextField
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
                label="البريد الإلكتروني"
                placeholder="example@gmail.com"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                fullWidth
                error={email.length > 0 && (isDisposableEmail(email) || !emailRegex.test(email))}
                helperText={
                  email.length > 0 && isDisposableEmail(email) ? 'لا يسمح باستخدام بريد إلكتروني مؤقت أو وهمي.' :
                  (email.length > 0 && !emailRegex.test(email) ? 'صيغة البريد الإلكتروني غير صحيحة.' : '')
                }
                variant="outlined"
              />
              <TextField
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
                label="عنوان الشكوى"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
              <TextField
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
                label="نوع الشكوى"
                value={type}
                onChange={e => setType(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
              <TextField
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
                label="التفاصيل"
                value={details}
                onChange={e => setDetails(e.target.value)}
                required
                fullWidth
                multiline
                minRows={4}
                variant="outlined"
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  '&:hover': {
                    textShadow: '0 0 3px #27ae60',
                    backgroundColor: theme => theme.palette.mode === 'dark' ? '#27ae60' : '#c2eeba',
                    border: theme => theme.palette.mode === 'dark' ? '2px solid #fff' : '2px solid #27ae60',
                    '&:active, &:focus-visible': {
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 0 0 4px rgba(46, 204, 113, 0.28)'
                        : '0 0 0 4px rgba(216, 245, 199, 0.45)'
                    }
                  }
                }}
              >
                مرفقات
                <input
                  type="file"
                  hidden
                  onChange={e => setFile(e.target.files[0])}
                />
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!isFormValid() || isDuplicate || checkingDuplicate}
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
                  }
                }}
              >
                {checkingDuplicate ? 'جاري التحقق...' : isDuplicate ? 'لا يمكنك إرسال شكوى مكررة' : 'إرسال الشكوى'}
              </Button>
            </Stack>
            {isDuplicate && (
              <Alert severity="warning">هذه الشكوى موجودة بالفعل في لوحة الإدارة ولا يمكن إرسالها مرة أخرى.</Alert>
            )}
            {hasRepeatedFields() && (
              <Alert severity="warning">لا يمكن تكرار نفس القيمة في أكثر من حقل.</Alert>
            )}
            {success && <Alert severity="success">تم إرسال الشكوى بنجاح!</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </Stack>
      </Paper>
    </Box>
    </>
  );
}

export default ComplaintForm;
