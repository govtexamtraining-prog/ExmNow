// API to handle Pre-registration for Exam Results (IndiaResults Service)
// Allows candidates to receive SMS & WhatsApp alerts the instant results are announced.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, rollNumber, mobile, email, examId, examName } = req.body;

    if (!mobile || !examId) {
      return res.status(400).json({ success: false, error: 'Mobile number and Exam are required.' });
    }

    // Save to global in-memory alerts ledger
    globalThis.__exmNowAlerts = globalThis.__exmNowAlerts || [];
    const newAlert = {
      id: 'alert_' + Date.now(),
      name: name || 'Candidate',
      roll_number: rollNumber || '',
      mobile: mobile.trim(),
      email: email ? email.trim() : '',
      exam_id: examId,
      exam_name: examName || examId,
      registered_at: new Date().toISOString(),
      status: 'ACTIVE_DISPATCH_QUEUE'
    };

    globalThis.__exmNowAlerts.unshift(newAlert);

    return res.status(200).json({
      success: true,
      message: `Registration confirmed! You will receive instant WhatsApp and SMS scorecards the minute results are declared for ${examName || examId}.`,
      alert: newAlert
    });
  } catch (error) {
    console.error('Alert registration error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
