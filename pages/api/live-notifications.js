import { getLiveNotifications } from '../../lib/liveNotifications';

export default async function handler(req, res) {
  try {
    const notifications = await getLiveNotifications();

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({
      success: true,
      total: notifications.length,
      notifications
    });
  } catch (error) {
    console.error('Error in live-notifications API:', error);
    return res.status(500).json({ error: error.message });
  }
}
