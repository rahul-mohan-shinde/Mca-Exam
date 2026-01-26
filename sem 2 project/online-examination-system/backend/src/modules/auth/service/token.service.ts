import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_IN: string = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class TokenService {
  // Step 1: Generate access token
  generateAccessToken(payload: TokenPayload): string {
    const tokenPayload = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role
    };
    
    const options: SignOptions = {
      expiresIn: JWT_EXPIRES_IN as any,
      issuer: 'online-examination-system',
      audience: 'online-examination-system'
    };
    
    return jwt.sign(tokenPayload, JWT_SECRET, options);
  }

  // Step 2: Generate refresh token
  generateRefreshToken(userId: string): string {
    const tokenPayload = { userId };
    const options: SignOptions = {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN as any
    };
    
    return jwt.sign(tokenPayload, JWT_SECRET, options);
  }

  // Step 3: Verify token
  verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  // Step 4: Decode token without verification
  decodeToken(token: string): any {
    return jwt.decode(token);
  }

  // Step 5: Get token expiration time in seconds
  getTokenExpirationTime(): number {
    const expiresIn = JWT_EXPIRES_IN;
    if (expiresIn.endsWith('m')) {
      return parseInt(expiresIn) * 60;
    } else if (expiresIn.endsWith('h')) {
      return parseInt(expiresIn) * 3600;
    } else if (expiresIn.endsWith('d')) {
      return parseInt(expiresIn) * 86400;
    }
    return 900; // Default 15 minutes
  }
}

export default new TokenService();

