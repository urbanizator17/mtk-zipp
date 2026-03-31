import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return res.status(500).json({ error: "Telegram not configured" });
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const tgResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      })
    });

    if (!tgResponse.ok) {
      throw new Error(`Failed to send to Telegram`);
    }

    return res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
