/**
 * notify.ts
 * Visitor notification utility.
 * Fires once per browser session using sessionStorage to avoid spam.
 * Uses ipapi.co to get anonymous geo-location data, then sends to Web3Forms.
 */

// ─────────────────────────────────────────────────────────────────
// CONFIGURATION — Fill these in:
// ─────────────────────────────────────────────────────────────────

// 1. Get your FREE Web3Forms access key at https://web3forms.com
//    It is a PUBLIC key — completely safe to put in frontend code.
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY_HERE'

// 2. (Optional) Discord Webhook URL — to receive instant phone notifications.
//    Create a webhook in any Discord channel: Server Settings > Integrations > Webhooks
//    Then paste the URL here. Leave empty string '' to disable.
const DISCORD_WEBHOOK_URL = ''

// ─────────────────────────────────────────────────────────────────

interface VisitorInfo {
  ip: string
  city: string
  region: string
  country_name: string
  org: string
}

async function getVisitorGeo(): Promise<VisitorInfo | null> {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

async function sendWebhook(geo: VisitorInfo | null): Promise<void> {
  const now = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const location = geo
    ? `${geo.city}, ${geo.region}, ${geo.country_name}`
    : 'Ubicación desconocida'
  const isp = geo?.org ?? 'ISP desconocido'
  const ip = geo?.ip ?? 'IP desconocida'

  const messageText = `🌐 *¡Nueva visita a tu portafolio!*\n📅 ${now}\n📍 ${location}\n🏢 ${isp}\n🔗 IP: ${ip}`
  const subjectText = `📬 Nueva visita desde ${location}`

  // ── Send via Web3Forms (email) ──────────────────────────────────
  if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: subjectText,
          message: messageText,
          // The email recipient is configured inside your Web3Forms dashboard.
        }),
      })
    } catch (e) {
      console.warn('[notify] Web3Forms error:', e)
    }
  }

  // ── Send via Discord Webhook (push to phone) ────────────────────
  if (DISCORD_WEBHOOK_URL) {
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: messageText }),
      })
    } catch (e) {
      console.warn('[notify] Discord webhook error:', e)
    }
  }
}

/**
 * Call this once at app startup.
 * It will only fire one notification per browser session.
 */
export async function notifyVisit(): Promise<void> {
  const SESSION_KEY = 'portfolio_visit_notified'
  if (sessionStorage.getItem(SESSION_KEY)) return
  sessionStorage.setItem(SESSION_KEY, '1')

  const geo = await getVisitorGeo()
  await sendWebhook(geo)
}
