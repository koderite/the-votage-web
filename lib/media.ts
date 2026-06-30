import { defaultMediaItems, type MediaItem } from './media-data';

// How long to cache each upstream response. The section shows the newest
// upload/episode without hammering YouTube/Spotify on every page view.
const REVALIDATE_SECONDS = 600;

// Source identifiers. These have sensible defaults but can be overridden via
// env vars without a code change.
//
// We read dedicated *playlists* rather than the raw channel uploads so each
// card shows the right kind of content: the latest full movie (not the latest
// skit/short) and the latest live service (not the latest clip).
const MOVIES_PLAYLIST_ID =
  process.env.YOUTUBE_MOVIES_PLAYLIST_ID || 'PL7hfDjeiqsWtxih6hjW9LmIKtJYymjHO4'; // "THE WINLOS MOVIES"
const LIVE_PLAYLIST_ID =
  process.env.YOUTUBE_LIVE_PLAYLIST_ID || 'PLe1VRppQoYh4Rqdo11qlnkmSsjg3fxMrQ'; // @AnwinliOjeikere "LIVE"
const SPOTIFY_SHOW_ID =
  process.env.SPOTIFY_SHOW_ID || '4KLNlwoOOutIpPgcqfkhDt';

// Highest-resolution thumbnail (1280x720). The component falls back to
// hqdefault for the rare video that has no maxres image.
function youTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

interface LatestVideo {
  videoId: string;
  title: string;
}

// Reads a public RSS feed (channel or playlist) and returns its most recent
// entry. The first <entry> in a YouTube feed is always the newest item.
async function fetchLatestYouTubeVideo(
  feedUrl: string,
): Promise<LatestVideo | null> {
  try {
    const res = await fetch(feedUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;

    const xml = await res.text();
    const firstEntry = xml.match(/<entry>[\s\S]*?<\/entry>/)?.[0] ?? '';
    const videoId =
      firstEntry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? null;
    const title = firstEntry.match(/<title>([^<]*)<\/title>/)?.[1] ?? null;

    if (!videoId) return null;
    return { videoId, title: title ? decodeXmlEntities(title) : '' };
  } catch {
    return null;
  }
}

interface LatestEpisode {
  title: string;
  image: string;
  url: string;
}

// Fetches the latest episode of a Spotify show via the Client Credentials flow.
// Requires SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET; returns null (so we fall
// back to the static card) if they're missing or the request fails.
async function fetchLatestSpotifyEpisode(
  showId: string,
): Promise<LatestEpisode | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`,
        ).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!tokenRes.ok) return null;

    const { access_token: accessToken } = (await tokenRes.json()) as {
      access_token?: string;
    };
    if (!accessToken) return null;

    const epRes = await fetch(
      `https://api.spotify.com/v1/shows/${showId}/episodes?limit=1&market=US`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
    if (!epRes.ok) return null;

    const data = (await epRes.json()) as {
      items?: Array<{
        name?: string;
        external_urls?: { spotify?: string };
        images?: Array<{ url?: string }>;
      }>;
    };

    const episode = data.items?.[0];
    if (!episode?.name) return null;

    return {
      title: episode.name,
      image: episode.images?.[0]?.url ?? '',
      url: episode.external_urls?.spotify ?? '',
    };
  } catch {
    return null;
  }
}

// Builds the media items shown on the home page, overriding the YouTube and
// Spotify cards with their latest content. Any card whose fetch fails keeps its
// static fallback value.
export async function getMediaItems(): Promise<MediaItem[]> {
  const feed = (id: string) =>
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`;

  const [latestMovie, latestLive, spotify] = await Promise.all([
    fetchLatestYouTubeVideo(feed(MOVIES_PLAYLIST_ID)),
    fetchLatestYouTubeVideo(feed(LIVE_PLAYLIST_ID)),
    fetchLatestSpotifyEpisode(SPOTIFY_SHOW_ID),
  ]);

  return defaultMediaItems.map((item) => {
    // Movies card -> latest full movie from the "THE WINLOS MOVIES" playlist
    if (item.id === '0' && latestMovie) {
      return {
        ...item,
        contentTitle: latestMovie.title || item.contentTitle,
        image: youTubeThumbnail(latestMovie.videoId),
        url: `https://www.youtube.com/watch?v=${latestMovie.videoId}`,
      };
    }

    // Stream Refresh card -> latest live service from the "LIVE" playlist
    if (item.id === '2' && latestLive) {
      return {
        ...item,
        contentTitle: latestLive.title || item.contentTitle,
        image: youTubeThumbnail(latestLive.videoId),
        url: `https://www.youtube.com/watch?v=${latestLive.videoId}`,
      };
    }

    // Spotify sermons card -> latest episode. Also surface the episode title as
    // the card's description (the "The Available Man" line in the list) so it
    // reflects the latest topic rather than a fixed one.
    if (item.id === '3' && spotify) {
      return {
        ...item,
        description: spotify.title || item.description,
        contentTitle: spotify.title || item.contentTitle,
        image: spotify.image || item.image,
        url: spotify.url || item.url,
      };
    }

    return item;
  });
}
