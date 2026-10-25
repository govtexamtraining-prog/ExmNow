import { db } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const { category, state, status, search } = req.query;
    const exams = await db.getExams({ category, state, status, search });
    return res.status(200).json({ success: true, exams, count: exams.length });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
