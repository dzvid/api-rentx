import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import { AppError } from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

const rateLimiterRedis = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10, // 5 requests
  duration: 5, // per 5 seconds by IP
});

export default async function rateLimiter(
  request: Request,
  respose: Response,
  next: NextFunction
): Promise<void> {
  try {
    await rateLimiterRedis.consume(request.ip);
    return next();
  } catch (error) {
    throw new AppError('Too many requests', 429);
  }
}
