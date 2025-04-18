import logger from '@/lib/logger';

export function withLogging(handler: (req: Request) => Promise<Response>) {
  return async (req: Request) => {
    const start = Date.now();

    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    try {
      const res = await handler(req);
      const duration = Date.now() - start;
      logger.info(
        `${req.method} ${req.url} - ${res.status} (${duration}ms) - IP: ${ip}`
      );
      return res;
    } catch (error) {
      const duration = Date.now() - start;
      logger.error(
        `${req.method} ${req.url} - ERROR (${duration}ms) - IP: ${ip}`,
        { error }
      );
      throw error;
    }
  };
}
