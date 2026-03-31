import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("API /api/contact called. Method:", req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    console.log("Received message:", message);
    
    if (!message) {
      console.error("Message is missing in request body");
      return res.status(400).json({ error: 'Message is required' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log("Checking config: Token exists?", !!botToken, "ChatId exists?", !!chatId);

    if (!botToken || !chatId) {
      console.error("Telegram configuration missing");
      return res.status(500).json({ error: "Telegram not configured" });
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    console.log("Sending request to Telegram API...");
    
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

    const responseText = await tgResponse.text();
    console.log("Telegram API Response Status:", tgResponse.status);
    console.log("Telegram API Response Body:", responseText);

    if (!tgResponse.ok) {
      throw new Error(`Failed to send to Telegram: ${responseText}`);
    }

    return res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
