import { NextResponse } from 'next/server'

// The Votage YouTube channel (@thevotage). Override with YOUTUBE_CHANNEL_ID if it ever changes.
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCQdm4ZR3OEvEZMkkju_wfKg'

// Cache the upstream feed for 10 minutes so we always show the newest upload/stream
// without hammering YouTube on every page view.
const REVALIDATE_SECONDS = 600

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

export async function GET() {
  try {
    const upstream = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    )

    if (!upstream.ok) {
      return NextResponse.json({ videoId: null }, { status: 502 })
    }

    const xml = await upstream.text()

    // The first <entry> in a YouTube channel feed is always the most recent video/stream.
    const firstEntry = xml.match(/<entry>[\s\S]*?<\/entry>/)?.[0] ?? ''
    const videoId = firstEntry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? null
    const title = firstEntry.match(/<title>([^<]*)<\/title>/)?.[1] ?? null

    if (!videoId) {
      return NextResponse.json({ videoId: null }, { status: 502 })
    }

    return NextResponse.json({
      videoId,
      title: title ? decodeXmlEntities(title) : null,
    })
  } catch {
    return NextResponse.json({ videoId: null }, { status: 502 })
  }
}
