const express = require('express');
const router = express.Router();
const complaintDB = require('../models/Complaint');
const { sendMail } = require('../utils/mailer');

// Endpoint to submit result/feedback for a complaint
router.post('/:id/result', async (req, res) => {
  const { id } = req.params;
  const { result } = req.body;
  console.log('[POST /:id/result] Incoming request:', { id, result });
  if (!result || !result.trim()) {
    console.warn('[POST /:id/result] Missing result in request body');
    return res.status(400).json({ message: 'نتيجة الشكوى مطلوبة.' });
  }
  try {
    complaintDB.findOne({ _id: id }, async (err, complaint) => {
      if (err || !complaint) {
        console.error('[POST /:id/result] Complaint not found or DB error:', err, 'Complaint:', complaint);
        return res.status(404).json({ message: 'لم يتم العثور على الشكوى.' });
      }
      console.log('[POST /:id/result] Found complaint:', complaint);
      complaintDB.update({ _id: id }, { $set: { result } }, {}, async (updateErr, numAffected) => {
        if (updateErr) {
          console.error('[POST /:id/result] Error updating complaint:', updateErr);
          return res.status(500).json({ message: 'خطأ في حفظ النتيجة', error: updateErr.message });
        }
        console.log('[POST /:id/result] Updated complaint with result. numAffected:', numAffected);
        try {
          const statusAr = {
            'pending': 'قيد الانتظار',
            'on progress': 'قيد المعالجة',
            'resolved': 'تم الحل',
            'unsolvable': 'غير قابلة للحل'
          };
          const complaintPortalUrl = process.env.PORTAL_URL || 'http://localhost:3000';
          const html = `
            <div style="font-family: 'Tajawal', Arial, sans-serif; background: #f9fafb; padding: 24px;">
              <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px #eee; padding: 32px;">
                <h2 style="color: #183a5a;">مرحباً ${complaint.name || ''},</h2>
                <p style="font-size: 18px; color: #333;">تم تحديث حالة الشكوى الخاصة بك.</p>
                <table style="width: 100%; margin: 16px 0; border-collapse: collapse;">
                  <tr><td style="padding: 6px 0; color: #888;">عنوان الشكوى:</td><td style="padding: 6px 0; font-weight: bold; color: #183a5a;">${complaint.title || '-'}</td></tr>
                  <tr><td style="padding: 6px 0; color: #888;">نوع الشكوى:</td><td style="padding: 6px 0;">${complaint.type || '-'}</td></tr>
                  <tr><td style="padding: 6px 0; color: #888;">الحالة الحالية:</td><td style="padding: 6px 0; color: #2ecc71; font-weight: bold;">${statusAr[complaint.status] || complaint.status}</td></tr>
                </table>
                <div style="margin: 18px 0; padding: 16px; background: #f1f8e9; border-radius: 8px;">
                  <strong style="color: #27ae60;">نتيجة الإدارة:</strong>
                  <div style="margin-top: 10px; color: #222; font-size: 17px;">${result}</div>
                </div>
                <a href="${complaintPortalUrl}" style="display: inline-block; margin-top: 18px; padding: 10px 24px; background: #27ae60; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 700;">زيارة بوابة الشكاوى</a>
                <p style="margin-top: 24px; color: #888; font-size: 15px;">مع تحيات فريق الشكاوى</p>
              </div>
            </div>
          `;
          if (!complaint.email) {
            console.error('[POST /:id/result] Complaint has no email:', complaint);
          }
          await sendMail({
            to: complaint.email,
            subject: 'نتيجة الشكوى الخاصة بك',
            text: `السلام عليكم ${complaint.name || ''}\n\nتم تحديث حالة الشكوى الخاصة بك إلى: ${statusAr[complaint.status] || complaint.status}\nعنوان الشكوى: ${complaint.title || '-'}\nنوع الشكوى: ${complaint.type || '-'}\n\nنتيجة الإدارة: ${result}\n\nيمكنك زيارة بوابة الشكاوى: ${complaintPortalUrl}\n\nمع تحيات فريق الشكاوى.`,
            html
          });
          console.log('[POST /:id/result] Email sent to:', complaint.email);
        } catch (mailErr) {
          console.error('[POST /:id/result] Error sending email:', mailErr);
          return res.status(500).json({ message: 'تم حفظ النتيجة لكن فشل إرسال البريد الإلكتروني', error: mailErr.message });
        }
        res.json({ message: 'تم حفظ نتيجة الشكوى وإرسالها عبر البريد الإلكتروني بنجاح.' });
      });
    });
  } catch (e) {
    console.error('[POST /:id/result] Unexpected error:', e);
    res.status(500).json({ message: 'حدث خطأ غير متوقع', error: e.message });
  }
});

module.exports = router;
