import jwt from 'jsonwebtoken';
import User from './models/User';
import connectDB from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(
  req: Request
): Promise<{ userId: string; email: string; role: string } | null> {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);

  if (!payload) {
    return null;
  }

  await connectDB();
  const user = await User.findById(payload.userId);

  if (!user || user.status !== 'active') {
    return null;
  }

  return {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };
}

export async function requireAuth(
  req: Request
): Promise<{ userId: string; email: string; role: string }> {
  const user = await authenticateUser(req);

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

export async function requireAdmin(
  req: Request
): Promise<{ userId: string; email: string; role: string }> {
  const user = await requireAuth(req);

  if (user.role !== 'admin') {
    throw new Error('Forbidden: Admin access required');
  }

  return user;
}

