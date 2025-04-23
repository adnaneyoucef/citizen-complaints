import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
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
    <div style={{ maxWidth: 400, margin: '60px auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <button type="button" onClick={() => navigate('/')} style={{ background: '#888', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 4, fontSize: 15 }}>العودة للرئيسية</button>
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>دخول المسؤول</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>البريد الإلكتروني</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>كلمة المرور</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, fontSize: 16 }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 12, fontSize: 18, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>دخول</button>
        {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      </form>
    </div>
  );
}

export default AdminLogin;
