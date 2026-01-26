import { Request, Response, NextFunction } from 'express';

// Simple in-memory rate limiter (use Redis in production)
const requestCounts: Map<string, { count: number; resetTime: number }> = new Map();

export const rateLimiter = (options: { maxAttempts: number; windowMs: number }) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // Step 1: Get or create request count for IP
    let requestData = requestCounts.get(ip);

    if (!requestData || now > requestData.resetTime) {
      // Step 2: Reset or create new entry
      requestData = {
        count: 1,
        resetTime: now + options.windowMs
      };
      requestCounts.set(ip, requestData);
      next();
      return;
    }

    // Step 3: Check if limit exceeded
    if (requestData.count >= options.maxAttempts) {
      res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
      return;
    }

    // Step 4: Increment count
    requestData.count++;
    requestCounts.set(ip, requestData);
    next();
  };
};

