import React, { useEffect, useState, useRef } from 'react';
import Tooltip from '@mui/material/Tooltip';



import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Stack, useTheme, Menu, MenuItem } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const statusOptions = [
  { value: 'pending', label: 'قيد الانتظار', color: 'warning' },
  { value: 'on progress', label: 'قيد المعالجة', color: 'info' },
  { value: 'resolved', label: 'تم الحل', color: 'success' },
  { value: 'unsolvable', label: 'غير قابلة للحل', color: 'error' }
];

function StatusMenuButton({ status, onChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  // Fallback to 'pending' if status is missing or invalid
  const current = statusOptions.find(opt => opt.value === status) || statusOptions[0];
  const others = statusOptions.filter(opt => opt.value !== current.value);
  return (
    <>
      <Button
        variant="contained"
        color={current.color}
        fullWidth
        size="small"
        sx={{ fontWeight: 700, borderRadius: 2, textTransform: 'none' }}
        onClick={handleClick}
      >
        {current.label}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {others.map(opt => (
          <MenuItem
            key={opt.value}
            onClick={() => { handleClose(); setTimeout(() => onChange(opt.value), 0); }}
            selected={status === opt.value}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

import AnimatedBackground from './AnimatedBackground';

function AdminDashboard() {
  const theme = useTheme();
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3500);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  const navigate = useNavigate();

  useEffect(() => {
    // authentication and data fetching logic here
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    // Always cleanup duplicates before fetching complaints
    axios.post('http://localhost:5000/api/cleanup/cleanup-complaints')
      .then(res => {
        if (res.data && res.data.removed > 0) {
          setError(`تم حذف ${res.data.removed} شكوى مكررة تلقائياً`);
          setTimeout(() => setError(''), 4000);
        }
      })
      .catch(() => {/* ignore cleanup errors */})
      .finally(() => {
        axios.get('http://localhost:5000/api/complaints', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => setComplaints(res.data))
          .catch(() => setError('فشل تحميل الشكاوى'));
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <>
      <AnimatedBackground sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }} />
      <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? '#181c1f' : '#f5f8f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: { xs: 'flex-start', md: 'center' },
        px: 1,
        py: { xs: 2, md: 6 }
      }}
    >
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Paper sx={{
          overflowX: 'auto',
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          minWidth: 1100,
          maxWidth: '96vw',
          width: 'fit-content',
          mx: 'auto',
          boxShadow: '0 0 32px 0 rgba(39, 174, 96, 0.18), 0 2px 8px 0 rgba(0,0,0,0.08)',
          background: theme => theme.palette.mode === 'dark' ? 'rgba(24, 28, 31, 0.98)' : 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(12px) saturate(1.3)',
          border: '1.5px solid',
          borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(39,174,96,0.13)' : 'rgba(39,174,96,0.09)',
          transition: 'background 0.5s, box-shadow 0.5s',
          maxHeight: { xs: 'none', md: 'calc(100vh - 32px)' },
          overflowY: { xs: 'visible', md: 'auto' },
        }}>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h4" fontWeight={700} align="center" sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#183a5a' }}>
              لوحة تحكم المسؤول
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{
                fontSize: 20,
                fontWeight: 700,
                boxShadow: 'none',
                border: '2px solid transparent',
                '&:hover': {
                  textShadow: '0 0 3px #27ae60',
                  backgroundColor: theme.palette.mode === 'dark' ? '#27ae60' : '#c2eeba',
                  boxShadow: 'none',
                  border: theme.palette.mode === 'dark' ? '2px solid #fff' : '2px solid #27ae60'
                }
              }}
            >
              تسجيل الخروج
            </Button>
          </Stack>
          {successMessage && (
            <Stack sx={{ mb: 3, alignItems: 'center', width: '100%' }}>
              <Paper elevation={8} sx={{ px: 4, py: 2, bgcolor: '#27ae60', color: '#fff', fontWeight: 700, fontSize: 20, borderRadius: 2, boxShadow: '0 4px 24px 0 rgba(39,174,96,0.18)' }}>
                {successMessage}
              </Paper>
            </Stack>
          )}
          <TableContainer sx={{
            boxShadow: 3,
            bgcolor: 'background.paper',
            mt: 2,
            overflowX: 'auto',
            overflow: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            width: '100%',
            maxHeight: '55vh',
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{
                  background: theme => theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, #232a3b 0%, #263045 100%)'
                    : 'linear-gradient(90deg, #e3ebf6 0%, #dbeafe 100%)',
                  boxShadow: '0 4px 18px 0 rgba(24, 58, 90, 0.10)',
                  position: 'sticky',
                  top: 0,
                  zIndex: 2,
                  height: 64,
                  borderRadius: 0
                }}>
                  <TableCell sx={{ maxWidth: 120, fontWeight: 800, fontSize: 18, color: theme => theme.palette.mode === 'dark' ? '#fff' : '#183a5a', background: 'inherit', whiteSpace: 'nowrap', borderBottom: 3, borderColor: theme => theme.palette.mode === 'dark' ? '#00bfae' : '#1976d2', position: 'sticky', top: 0, zIndex: 3, border: 'none', px: 2, py: 2, letterSpacing: 1, textAlign: 'center', verticalAlign: 'middle' }}>العنوان</TableCell>
                  <TableCell sx={{ maxWidth: 200, fontWeight: 800, fontSize: 18, color: theme => theme.palette.mode === 'dark' ? '#fff' : '#183a5a', background: 'inherit', whiteSpace: 'nowrap', borderBottom: 3, borderColor: theme => theme.palette.mode === 'dark' ? '#00bfae' : '#1976d2', position: 'sticky', top: 0, zIndex: 3, border: 'none', px: 2, py: 2, letterSpacing: 1, textAlign: 'center', verticalAlign: 'middle' }}>التفاصيل</TableCell>
                  <TableCell sx={{ maxWidth: 100, fontWeight: 800, fontSize: 18, color: theme => theme.palette.mode === 'dark' ? '#fff' : '#183a5a', background: 'inherit', whiteSpace: 'nowrap', borderBottom: 3, borderColor: theme => theme.palette.mode === 'dark' ? '#00bfae' : '#1976d2', position: 'sticky', top: 0, zIndex: 3, border: 'none', px: 2, py: 2, letterSpacing: 1, textAlign: 'center', verticalAlign: 'middle' }}>النوع</TableCell>
                  <TableCell sx={{ minWidth: 130, maxWidth: 140, fontWeight: 800, fontSize: 18, color: theme => theme.palette.mode === 'dark' ? '#fff' : '#183a5a', background: 'inherit', borderBottom: 3, borderColor: theme => theme.palette.mode === 'dark' ? '#00bfae' : '#1976d2', position: 'sticky', top: 0, zIndex: 3, border: 'none', px: 2, py: 2, letterSpacing: 1, textAlign: 'center', verticalAlign: 'middle' }}>الحالة</TableCell>
                  <TableCell sx={{ maxWidth: 90, fontWeight: 800, fontSize: 18, color: theme => theme.palette.mode === 'dark' ? '#fff' : '#183a5a', background: 'inherit', whiteSpace: 'nowrap', borderBottom: 3, borderColor: theme => theme.palette.mode === 'dark' ? '#00bfae' : '#1976d2', textAlign: 'center', position: 'sticky', top: 0, zIndex: 3, border: 'none', px: 2, py: 2, letterSpacing: 1, verticalAlign: 'middle' }}>التاريخ</TableCell>
                  <TableCell sx={{
                    maxWidth: 80,
                    fontWeight: 800,
                    fontSize: 18,
                    color: theme => theme.palette.mode === 'dark' ? '#fff' : '#183a5a',
                    background: 'inherit',
                    borderBottom: 3,
                    borderColor: theme => theme.palette.mode === 'dark' ? '#00bfae' : '#1976d2',
                    position: 'sticky',
                    top: 0,
                    zIndex: 3,
                    border: 'none',
                    letterSpacing: 1,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    p: 0,
                    m: 0
                  }}>المرفقات</TableCell>
                  <TableCell sx={{ maxWidth: 80, fontWeight: 800, fontSize: 18, color: theme => theme.palette.mode === 'dark' ? '#fff' : '#183a5a', background: 'inherit', textAlign: 'center', borderBottom: 3, borderColor: theme => theme.palette.mode === 'dark' ? '#00bfae' : '#1976d2', position: 'sticky', top: 0, zIndex: 3, border: 'none', px: 2, py: 2, letterSpacing: 1, verticalAlign: 'middle' }}></TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {(Array.isArray(complaints) ? complaints : []).map((c, idx) => (
                  <TableRow
                    key={c._id || idx}
                    sx={theme => ({
                      backgroundColor: idx % 2 === 0
                        ? (theme.palette.mode === 'dark' ? '#23272a' : '#f8fafc')
                        : (theme.palette.mode === 'dark' ? '#1a1d23' : '#eaf1fb'),
                      transition: 'background 0.2s',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? '#2d3542' : '#c7e0fa',
                      }
                    })}
                  >
                    <TableCell sx={{ maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center', border: '1px solid', borderColor: theme => theme.palette.mode === 'dark' ? '#374151' : '#e3ebf6' }}>
                      {c.title}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center', border: '1px solid', borderColor: theme => theme.palette.mode === 'dark' ? '#374151' : '#e3ebf6' }}>
                      {c.details}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', border: '1px solid', borderColor: theme => theme.palette.mode === 'dark' ? '#374151' : '#e3ebf6', textAlign: 'center' }}>
                      {c.type || '-'}
                    </TableCell>
                    <TableCell sx={{ minWidth: 130, maxWidth: 140, p: 0.5, verticalAlign: 'middle', textAlign: 'center', border: '1px solid', borderColor: theme => theme.palette.mode === 'dark' ? '#374151' : '#e3ebf6' }}>
                      <StatusMenuButton
                        status={typeof c.status === 'string' ? c.status : 'pending'}
                        onChange={async (newStatus) => {
                          if (c.status === newStatus) return;
                          try {
                            // Optimistically update UI before backend confirmation
                            setComplaints((prev) => prev.map((item) =>
                              item._id === c._id ? { ...item, status: newStatus } : item
                            ));
                            await axios.patch(`http://localhost:5000/api/complaints/${c._id}`, { status: newStatus }, {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                              }
                            });
                            setError('تم تنفيذ العملية');
                            setTimeout(() => setError(''), 2000);
                          } catch {
                            setError('حدث خطأ أثناء تنفيذ العملية');
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ maxWidth: 90, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center', border: '1px solid', borderColor: theme => theme.palette.mode === 'dark' ? '#374151' : '#e3ebf6' }}>
                      <Tooltip title={c.createdAt ? new Date(c.createdAt).toLocaleDateString('fr-FR') : '-'} placement="top" arrow>
                        <span style={{ display: 'inline-block', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', verticalAlign: 'bottom' }}>{c.createdAt ? new Date(c.createdAt).toLocaleDateString('fr-FR') : '-'}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 80, textAlign: 'center', p: 0.5, border: '1px solid', borderColor: theme => theme.palette.mode === 'dark' ? '#374151' : '#e3ebf6' }}>
                      {c.attachment ? (
                        <Button
                          href={`http://localhost:5000/uploads/${c.attachment}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outlined"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        >
                          عرض
                        </Button>
                      ) : '-'}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 120, textAlign: 'center', p: 0.5, border: '1px solid', borderColor: theme => theme.palette.mode === 'dark' ? '#374151' : '#e3ebf6' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 13, px: 1.5, py: 0.5 }}
                        onClick={async () => {
                          // Automatically use complaint status or a default message as the result
                          const result = c.status === 'resolved' ? 'تم حل الشكوى بنجاح' : `حالة الشكوى: ${c.status}`;
                          try {
                            await axios.post(`http://localhost:5000/api/complaints/${c._id}/result`, { result }, {
                              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                            });
                            setSuccessMessage('✅ تم إرسال النتيجة بنجاح إلى صاحب الشكوى');
                            setTimeout(() => setSuccessMessage(''), 3500);
                          } catch {
                            setError('حدث خطأ أثناء إرسال النتيجة');
                          }
                        }}
                      >
                        إرسال النتيجة
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
    {/* Success Snackbar */}
    {successMessage && (
      <Stack sx={{ position: 'fixed', top: 24, left: 0, right: 0, zIndex: 3000, alignItems: 'center' }}>
      <Paper elevation={8} sx={{ px: 4, py: 2, bgcolor: '#27ae60', color: '#fff', fontWeight: 700, fontSize: 20, borderRadius: 2, boxShadow: '0 4px 24px 0 rgba(39,174,96,0.18)' }}>
        {successMessage}
      </Paper>
      </Stack>
    )}
    </>
  );
}

export default AdminDashboard;
