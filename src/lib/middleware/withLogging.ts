import logger from '@/lib/logger';

export function withLogging(handler: (req: Request) => Promise<Response>) {
  return async (req: Request) => {
    const start = Date.now();

    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : req.url;

    const res = await handler(req);
    const duration = Date.now() - start;

    logger.info(
      `${req.method} ${req.url} - ${res.status} (${duration}ms) - IP: ${ip}`
    );

    return res;
  };
}
