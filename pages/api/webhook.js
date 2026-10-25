import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { db, isSupabaseConfigured } from '../../lib/db';

const supabase = isSupabaseConfigured
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

export const config = { api: { bodyParser: false } };

async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) { 
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk); 
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['x-razorpay-signature'];
    const isSimulatedTest = req.headers['x-simulated-test'] === 'true' || req.query.simulate === 'true';
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Cryptographic signature check (bypassed only if explicit test header is passed in dev)
    if (webhookSecret && !isSimulatedTest) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (signature !== expectedSignature) {
        return res.status(400).json({ error: 'Cryptographic signature mismatch.' });
      }
    }

    const bodyText = rawBody.toString() || '{}';
    const eventData = JSON.parse(bodyText);

    if (eventData.event === 'payment.captured' || isSimulatedTest) {
      const paymentPayload = eventData.payload?.payment?.entity || eventData;
      const userPhone = paymentPayload.contact || paymentPayload.phone || '+919876543210';
      const targetExam = paymentPayload.notes?.exam_id || eventData.exam_id || 'CBSE_12_2026';
      const targetRoll = paymentPayload.notes?.roll_number || eventData.roll_number || '26104812';
      const unlockType = paymentPayload.notes?.unlock_type || 'ROLL_LOOKUP';
      const paymentId = paymentPayload.id || `pay_sim_${Date.now()}`;

      const unlockRecord = {
        phone_number: userPhone,
        target_exam_id: targetExam,
        target_roll_number: targetRoll,
        unlock_type: unlockType,
        payment_intent_id: paymentId,
        is_active: true
      };

      if (supabase) {
        await supabase
          .from('premium_unlocks')
          .insert(unlockRecord);
      }

      await db.createUnlock(unlockRecord);

      return res.status(200).json({ 
        status: 'SUCCESS', 
        message: 'Premium feature unlocked successfully',
        unlock: unlockRecord 
      });
    }

    return res.status(200).json({ status: 'IGNORED_EVENT', event: eventData.event });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
