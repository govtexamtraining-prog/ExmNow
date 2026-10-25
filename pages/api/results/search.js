import { db } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const { exam_id, query } = req.query;
    const results = await db.searchStudentResults({ examId: exam_id, query });
    return res.status(200).json({ success: true, results, count: results.length });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
