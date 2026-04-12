/**
 * Returns an embeddable URL for common video hosts, or null if not recognized.
 * Supports watch URLs, youtu.be short links, and direct video file paths.
 */
export function getVideoEmbedSrc(url: string): { kind: 'iframe'; src: string } | { kind: 'video'; src: string } | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  if (/\.(mp4|webm|ogg)(\?|$)/i.test(trimmed)) {
    return { kind: 'video', src: trimmed.startsWith('http') || trimmed.startsWith('/') ? trimmed : `/${trimmed}` };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '');

  if (host === 'youtu.be') {
    const id = parsed.pathname.replace(/^\//, '').split('/')[0];
    return id ? { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}` } : null;
  }

  if (host.endsWith('youtube.com')) {
    const v = parsed.searchParams.get('v');
    if (v) return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${v}` };
    const m = parsed.pathname.match(/^\/embed\/([^/?]+)/);
    if (m?.[1]) return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${m[1]}` };
    const s = parsed.pathname.match(/^\/shorts\/([^/?]+)/);
    if (s?.[1]) return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${s[1]}` };
  }

  if (host.endsWith('vimeo.com')) {
    const id = parsed.pathname.split('/').filter(Boolean)[0];
    return id && /^\d+$/.test(id)
      ? { kind: 'iframe', src: `https://player.vimeo.com/video/${id}` }
      : null;
  }

  return null;
}

export function resolveMediaSrc(src: string): string {
  const t = src.trim();
  if (!t) return '';
  if (t.startsWith('http://') || t.startsWith('https://') || t.startsWith('/')) return t;
  return `/${t}`;
}
