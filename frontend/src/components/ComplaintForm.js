import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ComplaintForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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

  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button type="button" onClick={() => navigate('/admin/login')} style={{ background: '#1976d2', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: 4, fontSize: 16 }}>دخول المسؤول</button>
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>إرسال شكوى</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: 16 }}>
          <label>الاسم</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 8, fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>البريد الإلكتروني</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>عنوان الشكوى</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: 8, fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>نوع الشكوى</label>
          <input type="text" value={type} onChange={e => setType(e.target.value)} required style={{ width: '100%', padding: 8, fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>التفاصيل</label>
          <textarea value={details} onChange={e => setDetails(e.target.value)} required style={{ width: '100%', padding: 8, fontSize: 16, minHeight: 80 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>مرفقات</label>
          <input type="file" onChange={e => setFile(e.target.files[0])} style={{ width: '100%' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 12, fontSize: 18, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>إرسال</button>
        {success && <div style={{ color: 'green', marginTop: 16 }}>تم إرسال الشكوى بنجاح!</div>}
        {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      </form>
    </div>
  );
}

export default ComplaintForm;
