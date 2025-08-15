import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

export interface JWTPayload {
  userId: string;
  username: string;
  role: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as JWTPayload;
    return {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role
    };
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export function isAuthenticated(req: NextRequest): boolean {
  const token = getTokenFromRequest(req);
  if (!token) return false;
  
  const payload = verifyToken(token);
  return payload !== null;
}

export function isAdmin(req: NextRequest): boolean {
  const token = getTokenFromRequest(req);
  if (!token) return false;
  
  const payload = verifyToken(token);
  return payload?.role === 'admin';
}
