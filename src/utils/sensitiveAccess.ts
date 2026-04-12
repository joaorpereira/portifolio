/** Query key/value that unlocks contact, GitHub, and full project navigation in the DOM. */
export const SENSITIVE_QUERY_KEY = 'password';
export const SENSITIVE_QUERY_VALUE = 'veterano';

export function isSensitiveContentRevealed(url: URL): boolean {
  return url.searchParams.get(SENSITIVE_QUERY_KEY) === SENSITIVE_QUERY_VALUE;
}

/**
 * Append the reveal query to an internal path so navigation stays unlocked.
 * Preserves existing `?` params and `#hash`.
 */
export function withSensitiveQuery(path: string, requestUrl: URL): string {
  if (!isSensitiveContentRevealed(requestUrl)) return path;
  const hashIdx = path.indexOf('#');
  const hash = hashIdx >= 0 ? path.slice(hashIdx) : '';
  const pathOnly = hashIdx >= 0 ? path.slice(0, hashIdx) : path;
  const sep = pathOnly.includes('?') ? '&' : '?';
  return `${pathOnly}${sep}${SENSITIVE_QUERY_KEY}=${encodeURIComponent(SENSITIVE_QUERY_VALUE)}${hash}`;
}
