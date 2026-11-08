/** Only Vercel's trusted ingress may supply forwarded public origin headers. */
export function validOrigin(headers: Headers, url: string, env = process.env): boolean {
  const origin = headers.get('origin');
  if (!origin || origin === 'null') return false;
  try {
    const parsed = new URL(origin);
    if (parsed.origin !== origin || !['http:', 'https:'].includes(parsed.protocol)) return false;
    const incoming = new URL(url);
    const host = env.VERCEL
      ? headers.get('x-forwarded-host') || headers.get('host')
      : headers.get('host');
    const protocol = env.VERCEL ? 'https:' : incoming.protocol;
    const expected = host ? new URL(protocol + '//' + host).origin : incoming.origin;
    return origin === expected || Boolean(env.APP_ORIGIN && origin === new URL(env.APP_ORIGIN).origin);
  } catch { return false; }
}
