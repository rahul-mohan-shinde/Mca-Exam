import { Request, Response, NextFunction } from 'express';
import tokenService from '../modules/auth/service/token.service';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    // Step 1: Extract token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'No token provided'
      });
      return;
    }

    // Step 2: Extract token
    const token = authHeader.replace('Bearer ', '');

    // Step 3: Verify token
    const decoded = tokenService.verifyToken(token);

    // Step 4: Attach user to request
    req.user = decoded;

    // Step 5: Continue to next middleware
    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

