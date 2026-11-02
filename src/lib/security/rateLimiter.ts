interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Rate limiter em memória por IP + rota para proteção contra spam e abuso em endpoints públicos.
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 8,
  windowMs = 60_000
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      retryAfterSeconds: 0,
    };
  }

  if (entry.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, retryAfterSeconds),
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    retryAfterSeconds: 0,
  };
}

export function sanitizeText(value: unknown, maxLength = 250): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  const clean = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean) && clean.length <= 160;
}
