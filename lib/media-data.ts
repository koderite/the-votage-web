// Shared media-section data: the `MediaItem` shape plus the static fallback
// content. The home page enriches the YouTube and Spotify cards with the latest
// content at request time (see lib/media.ts); if any of those fetches fail we
// fall back to the values defined here, so the section never renders empty.

export interface MediaItem {
  id: string;
  icon: 'telegram' | 'youtube' | 'spotify';
  title: string;
  subtitle: string;
  description: string;
  contentTitle: string;
  contentSubtitle: string;
  contentTag: string;
  image: string;
  url: string;
  // How the thumbnail fills its frame. 'cover' fills (crops edges) — good for
  // photos; 'contain' shows the whole image (letterboxed) — good for posters
  // and square artwork that shouldn't be cropped. Defaults to 'contain'.
  fit?: 'cover' | 'contain';
  // Label for the action button. Defaults to 'Watch'.
  cta?: string;
}

export const defaultMediaItems: MediaItem[] = [
  {
    id: '0',
    icon: 'youtube',
    title: 'WATCH OUR MOVIES AND SHORT SKITS',
    subtitle: 'Lessons and stories that will impact your life',
    description: 'The Winlos',
    contentTitle: 'Spirtuals Part 4',
    contentSubtitle: 'The Winlos',
    contentTag: 'Latest Movie',
    image: 'https://img.youtube.com/vi/y41jI31M-3Y/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=y41jI31M-3Y',
  },
  {
    id: '1',
    icon: 'telegram',
    title: 'SUNDAY SERMONS',
    subtitle: 'REV. OHIS',
    description: 'Breaking patterns & generational strong hold',
    contentTitle: 'Get our latest sermons',
    contentSubtitle: 'Join our Telegram channel',
    contentTag: 'On Telegram',
    image: '/img/sermon/sermon-hero.png',
    url: 'https://t.me/AAAAAEZ6sbhFRtY4ERUROA',
    cta: 'Join',
  },
  {
    id: '2',
    icon: 'youtube',
    title: 'STREAM REFRESH PROGRAMS',
    subtitle: 'Every Last Saturday of the month',
    description: 'Anwinli Ojeikere(THE WINLOS)',
    contentTitle: 'Stream Refresh Programs',
    contentSubtitle: 'Every Last Saturday',
    contentTag: 'Monthly Program',
    image: '/img/stream-refresh.jpg',
    url: 'https://www.youtube.com/@AnwinliOjeikere',
  },
  {
    id: '3',
    icon: 'spotify',
    title: 'SUNDAY SERMONS',
    subtitle: 'Pastor anwinli ojeikere',
    description: 'The Available Man',
    contentTitle: 'The Capacity Before Glory',
    contentSubtitle: '',
    contentTag: 'Latest Sermon',
    image: '/img/serm-rev.jpg',
    url: 'https://open.spotify.com/show/4KLNlwoOOutIpPgcqfkhDt?si=2zoqF8c8QeeQbNhe72SloA',
    cta: 'Listen',
  },
];
