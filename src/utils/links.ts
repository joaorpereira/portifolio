export function withHttps(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function mailto(email: string): string {
  return `mailto:${email}`;
}
