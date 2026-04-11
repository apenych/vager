export async function POST(request: Request) {
  const body = await request.json()
  const { name, phone, city, items, total, source } = body

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

  if (!BOT_TOKEN || !CHAT_ID) {
    return Response.json({ error: 'Telegram credentials not configured' }, { status: 500 })
  }

  // Формируем текст сообщения
  const itemsList = items
    .map((item: any) => `  • ${item.name} (арт. ${item.article}) — ${item.cartQuantity} шт. × ${item.price.toLocaleString()} ₸ = ${(item.price * item.cartQuantity).toLocaleString()} ₸`)
    .join('\n')

  const message = `
🛒 *Новый заказ!*

👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
🏙️ *Город:* ${city}

📦 *Товары:*
${itemsList}

💰 *Итого:* ${total.toLocaleString()} ₸
📍 *Источник:* ${source || 'Сайт'}
`.trim()

  // Отправляем в Telegram
  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

  try {
    const res = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    const data = await res.json()

    if (data.ok) {
      return Response.json({ success: true })
    } else {
      console.error('Telegram API error:', data)
      return Response.json({ error: 'Failed to send to Telegram' }, { status: 500 })
    }
  } catch (err) {
    console.error('Telegram send error:', err)
    return Response.json({ error: 'Network error' }, { status: 500 })
  }
}
