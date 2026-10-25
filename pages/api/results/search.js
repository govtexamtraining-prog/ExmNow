import { db } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const { exam_id, state, query, roll_code, search_mode } = req.query;
    const results = await db.searchStudentResults({ 
      examId: exam_id, 
      state,
      query, 
      rollCode: roll_code, 
      searchMode: search_mode 
    });
    return res.status(200).json({ success: true, results, count: results.length });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
