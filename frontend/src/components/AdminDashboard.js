import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    axios.get('http://localhost:5000/api/complaints', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setComplaints(res.data))
      .catch(() => setError('فشل تحميل الشكاوى'));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>لوحة تحكم المسؤول</h2>
        <button onClick={handleLogout} style={{ background: '#b71c1c', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: 4 }}>تسجيل الخروج</button>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1976d2', color: '#fff' }}>
            <th style={{ padding: 8 }}>العنوان</th>
            <th style={{ padding: 8 }}>الوصف</th>
            <th style={{ padding: 8 }}>التصنيف</th>
            <th style={{ padding: 8 }}>الحالة</th>
            <th style={{ padding: 8 }}>تاريخ الإرسال</th>
<th style={{ padding: 8 }}>مرفق</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c, idx) => (
            <tr key={c._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{c.title}</td>
              <td style={{ padding: 8 }}>{c.details}</td>
              <td style={{ padding: 8 }}>{c.type || '-'}</td>
              <td style={{ padding: 8 }}>{c.status}</td>
              <td style={{ padding: 8 }}>{c.createdAt ? new Date(c.createdAt).toLocaleDateString('fr-FR') : '-'}</td>
              <td style={{ padding: 8 }}>
                {c.attachment ? (
                  <a href={`http://localhost:5000/uploads/${c.attachment}`} target="_blank" rel="noopener noreferrer">تحميل</a>
                ) : (
                  '—'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {complaints.length === 0 && !error && <div style={{ marginTop: 24, textAlign: 'center' }}>لا توجد شكاوى حالياً</div>}
    </div>
  );
}

export default AdminDashboard;
